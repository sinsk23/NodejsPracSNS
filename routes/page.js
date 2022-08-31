const express = require("express");
//로그인 검사 미들웨어
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Post, User } = require("../models");

const router = express.Router();

//프로필
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", {
    title: "내 정보 - NodeBird",
    user: req.user,
  });
});
//회원가입
router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", {
    title: "회원가입 - NodeBird",
    user: req.user,
    joinError: req.flash("joinError"), //에러메세지를 보여주기위한 flash 메세지
  });
});

//로그인
router.get("/", (req, res, next) => {
  Post.findAll({
    include: {
      model: User,
      attributes: ["id", "nick"],
    },
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      res.render("main", {
        title: "NodeBird",
        twits: posts,
        user: req.user,
        loginError: req.flash("loginError"),
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

module.exports = router;
