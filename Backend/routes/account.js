const express = require('express');
const { Account, User, History } = require('../db');
const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res, next) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        const user = await User.findById(req.userId);
        const firstName = user ? user.firstName : '';
        res.json({ balance: account.balance, name: firstName });
    } catch (err) {
        next(err);
    }
});

router.post("/transfer", authMiddleware, async (req, res, next) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    let { amount, to } = req.body;
    amount = Number(amount);
    if (!to || !Number.isFinite(amount) || amount <= 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: "Invalid transfer payload" });
    }


    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            message: "Invalid account"
        });
    }


    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    const fromUser = await User.findById(req.userId).session(session);
    const toUser = await User.findById(to).session(session);

    await History.create([{
        userId: req.userId,
        name: toUser ? toUser.firstName : 'Unknown',
        amount: amount,
        sent: true
    }, {
        userId: to,
        name: fromUser ? fromUser.firstName : 'Unknown',
        amount: amount,
        sent: false
    }], { session, ordered: true });


    await session.commitTransaction();
    session.endSession();
    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;