const { Router } = require("express");
const authMiddleware = require('../middlewares/authMiddleware.js');
const { User, History } = require("../db");

const router = Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    const history = await History.find({ userId: req.userId }).sort({ timestamp: -1 });
    res.json({
      userData: user || null,
      history
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;