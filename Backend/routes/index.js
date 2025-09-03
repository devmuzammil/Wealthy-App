const express = require('express');
const userRouter = require('./user.js');
const accountRouter = require('./account.js');
const historyRouter = require('./history.js');
//Creating a Router
const router = express.Router();

router.use('/user', userRouter);
router.use('/account', accountRouter);
router.use('/history', historyRouter);
module.exports = router;