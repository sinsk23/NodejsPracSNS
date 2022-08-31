module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "hashtag",
    {
      title: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

//해시태그 모델은 태그 이름을 저장합니다. 해시태그 모델을 따로 두는 것은
//나중에 태그로 검색하기 위해서
