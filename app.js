const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo');
const connect = require('./schemas');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {notFound, errorHandler} = require('./errors/handlers');

// 설정
dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('dev')); // 로그
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: false}));
app.set('port', process.env.PORT || 8080);
connect();

// 라우팅
app.use('/todo', todoRouter);
app.use('/auth', authRouter);

// 에러처리
app.use(notFound);
app.use(errorHandler);

// 서버 실행
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});