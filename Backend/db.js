const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.error('Database connection error:', err));


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    resetCode: { type: String },
    resetCodeExpires: { type: Date }
});

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    balance: {
        type: Number,
        required: true
    }
})

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    sent: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);
const History = mongoose.model('History', historySchema);
module.exports = {
    User,
    Account,
    History
};