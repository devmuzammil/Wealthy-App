const express = require('express');
const userRouter = require('./user.js');
const accountRouter = require('./account.js')
//Creating a Router
const router = express.Router();

router.use('/user', userRouter);
router.use('/account', accountRouter);
module.exports = router;