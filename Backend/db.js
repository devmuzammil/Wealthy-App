const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Database Connected')).catch(console.log(err));

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    balance: {
        type: float,
        required: true
    }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);
module.exports = {
    User,
    Account
};