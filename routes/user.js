const express = require("express");
const { isLoggedIn } = require("./middlewares");
const { User } = require("../models");
const router = express.Router();
//다른사용자 팔로우 라우터
router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    await user.addFollowing(parseInt(req.params.id, 10));
    res.send("success");
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
