module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "post",
    {
      content: {
        type: DataTypes.STRING(140),
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

//게시글 모델은 게시글 내용과 이미지 경로를 저장
