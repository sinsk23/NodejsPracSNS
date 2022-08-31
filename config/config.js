// dotenv 모듈 설치하여 실행
// 실행하면 -> 어플리케이션 전체 프로세스에 걸쳐 process.env 라는 환경변수 객체에 .env 파일에 적인 정보가 넣어집니다.
const dotenv = require("dotenv");
dotenv.config();

const development = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
};

const production = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
};

// 테스트 시에는 여기를 지납니다.
const test = {
  username: process.env.TEST_MYSQL_USERNAME,
  password: process.env.TEST_MYSQL_PASSWORD,
  database: process.env.TEST_MYSQL_DATABASE,
  host: process.env.TEST_MYSQL_HOST,
  dialect: "mysql",
};

module.exports = { development, production, test };
