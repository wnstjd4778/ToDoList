const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo');
const authRouter = require('./routes/auth/index');
const passport = require('passport');
const connect = require('./schemas');

const app = express();

app.set('port', process.env.PORT || 8080);
connect();
app.use(morgan('dev')); // 로그
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/todo', todoRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    const error = new Error('&{req.method} ${req.url} 라우터가 없습니다.');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});