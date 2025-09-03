const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
const { User, Account } = require('../db.js');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const authMiddleware = require('../middlewares/authMiddleware.js');

const signupBody = z.object({
  username: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6)
});

const signinBody = z.object({
  username: z.email(),
  password: z.string()
});

router.post('/signup', async (req, res, next) => {
  try {
    const parsed = signupBody.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: 'Invalid Inputs', errors: parsed.error.errors });

    const { username, firstName, lastName, password } = parsed.data;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ message: 'User Already Exist' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, firstName, lastName, password: hashedPassword });
    await user.save();
    const userId = user._id;

    //Creating Account
    await Account.create({ userId, balance: 1 + Math.random() * 10000 });


    if (!SECRET_KEY) {
      throw new Error('Secret key is not defined in the Environment variables');
    }
    //creating JWT token
    const token = jwt.sign({ userId }, SECRET_KEY);
    res.status(201).json({ message: "User Created Successfully", token });
  } catch (err) {
    next(err);
  }
});

router.post('/signin', async (req, res, next) => {
  try {
    const parsed = signinBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Invalid Input', errors: parsed.error.errors });
    }

    const { username, password } = parsed.data;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const userId = user._id;
    if (!SECRET_KEY) {
      throw new Error('Secret Key not defined in Enviornment Variables');
    }
    const token = jwt.sign({ userId }, SECRET_KEY);

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
});

router.get('/bulk', authMiddleware, async (req, res, next) => {
  try {
    const filter = req.query.filter || '';
    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: 'i' } },
        { lastName: { $regex: filter, $options: 'i' } }
      ]
    }).select('-password');
    res.json({
      users: users.map(u => ({
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        _id: u._id
      }))
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
// Additional user routes
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

router.put('/password', authMiddleware, async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ _id: req.userId }, { $set: { password: hashedPassword } });
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
});

// Basic forgot-password flow with code (in-memory via DB fields; no email service)
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: 'Username (email) required' });
    const user = await User.findOne({ username });
    if (!user) return res.status(200).json({ message: 'If account exists, reset code sent' });
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = code;
    user.resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();
    // In real app, email code. For now, return code for demo/testing
    res.json({ message: 'Reset code generated', code });
  } catch (err) {
    next(err);
  }
});

router.post('/reset-password', async (req, res, next) => {
  try {
    const { username, code, password } = req.body;
    if (!username || !code || !password) return res.status(400).json({ message: 'username, code, and password required' });
    const user = await User.findOne({ username });
    if (!user || !user.resetCode || !user.resetCodeExpires) return res.status(400).json({ message: 'Invalid reset request' });
    if (user.resetCode !== code) return res.status(400).json({ message: 'Invalid code' });
    if (new Date() > user.resetCodeExpires) return res.status(400).json({ message: 'Code expired' });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    next(err);
  }
});