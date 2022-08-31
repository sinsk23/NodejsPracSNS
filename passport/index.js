const local = require("./localStrategy"); //로컬 로그인
const kakao = require("./kakaoStrategy"); //카카오 로그인
const { User } = require("../models");

module.exports = (passport) => {
  //serializeUser는 req.session 객체에 어떤 데이터를 저장할지 선택
  // 매개변수로 user를 받아, done 함수에 두 번째 인자로 user.id를 넘김

  passport.serializeUser((user, done) => {
    //로그인 사용자 정보인 user

    //done 함수의 첫 번째 인자는 에러 발생 시 사용
    //세션에 사용자 정보를 모두 저장하면 세션의 용량이 커지고 데이터 일관성에 문제가 발생하므로 사용자의 아이디만 저장하라고 명령
    done(null, user.id);
  });
  //deserializeUser는 매 요청 시 실행
  // passport.session() 미들웨어가 이 메서드를 호출
  //serializeUser에서 세션에 저장했던 아이디를 받아 데이터베이스에서 사용자 정보를 조회

  passport.deserializeUser((id, done) => {
    //user.id -> id
    User.findOne({ where: { id } })
      .then((user) => done(null, user)) //req.user에 저장 함으로 앞으로 req.user를 통해 로그인한 사용자 정보를 가져올 수 있음
      .catch((err) => done(err));
  });
  local(passport);
  kakao(passport);
};

//즉, serializeUser는 사용자 정보 객체를 세션에 아이디로 저장하는 것이고,
//deserializeUser는 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러오고
//세션에 불필요한 데이터를 담아두지 않기 위한 과정

/*
1. 로그인 요청이 들어옴
2. passport.authenticate 메서드 호출
3. 로그인 전략 수행
4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출5. req.login 메서드가 passport.serializeUser 호출
6. req.session에 사용자 아이디만 저장
7. 로그인 완료
*/

// 로그인 이후의 과정
/*
1. 모든 요청에 passport.session() 미들웨어가 passport.deserializeUser 메서드
호출
2. req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
3. 조회된 사용자 정보를 req.user에 저장
4. 라우터에서 req.user 객체 사용 가능
*/
