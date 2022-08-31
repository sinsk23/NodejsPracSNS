const KakaoStrategy = require("passport-kakao").Strategy;
const { User } = require("../models");
module.exports = (passport) => {
  //로컬 로그인과 마찬가지로 카카오 로그인에 대한 설정
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
        //먼저 기존에 카카오로 로그인한 사용자가 있는지 조회
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({ where: { snsId: profile.id, provider: "kakao" } });
          if (exUser) {
            done(null, exUser);
            //없다면 회원가입을 진행
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kaccount_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
