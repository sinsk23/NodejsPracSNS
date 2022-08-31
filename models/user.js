module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      nick: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      //sns로그인을 하였을 경우 provider와 snsId를 저장
      //provider가 local이면 로컬 로그인을, kakao면 카카오 로그인을 한것
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "local",
      },
      snsId: { type: DataTypes.STRING(30), allowNull: true },
    },
    {
      timestamps: true, //createdAt,updatedAt 컬럼 자동추가,row생성
      paranoid: true, //timestamps가 true일경우 deletedAt칼럼 추가
      //row 삭제하는 sequelize 명령 내릴 경우 deletedAt에 제거 날짜를 입력
    }
  );

//사용자 정보를 저장하는 모델입니다. 이메일, 닉네임, 비밀번호를 저장
