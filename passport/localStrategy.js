const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models");
module.exports = (passport) => {
  //LocalStrategy의 첫 번째 인자로 주어진 객체는 전략에 관한 설정을 하는 곳
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        //실제 전략을 수행하는 async 함수
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
