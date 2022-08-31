exports.isLoggedIn = (req, res, next) => {
  //로그인중이면 req.isAuthenticated()가 true 아니면 false
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};
