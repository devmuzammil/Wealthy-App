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