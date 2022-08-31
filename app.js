require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const pageRouter = require("./routes/page.js");
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/post.js");
const userRouter = require("./routes/user.js");

const { sequelize } = require("./models");

const passportConfig = require("./passport");

const app = express();
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });
passportConfig(passport);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("port", process.env.PORT || 8001);
app.use(morgan("dev"));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
//express-session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(flash());
app.use(passport.initialize()); //passport.initialize() 미들웨어는 요청(req 객체)에 passport 설정을 심고
app.use(passport.session()); //passport.session() 미들웨어는 req.session 객체에 passport 정보를 저장
//req.session 객체는 express-session에서 생성하는 것이므로 passport 미들웨어는express-session 미들웨어보다 뒤에 연결
app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

//404 미들웨어
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//에러 핸들링 미들웨어
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
