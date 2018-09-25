const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const testsql = require('./Utils/testsql');
const session = require('express-session');
const mysqlsession = require('express-mysql-session')(session);

const router = require('./routes/router');
const app = express();

const options = {
    host:'localhost',
    port:'3306',
    user:'root',
    password:'fuyu6666',
    database:'wechatbarrage',
    checkExpirationInterval:60000, //一分钟检查一次
    expiration: 3600000, //最大的生命期
    connectionLimit: 1,
    schema: {
        tableName: 'sessions', //表名
        columnNames: { //列
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }

};
const sessionStore = new mysqlsession(options);
app.roomList = {};
/**
 * 生成数据库表
 */
testsql.sequelize.sync({force: true}).then(() => {
  console.log('ServerSQL Successed to Start');
}).catch(e => {
  console.log(e);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    key: 'mgyusys', //自行设置密钥
    secret: 'sysuygm', //私钥
    cookie: {
        maxAge: 60000  //最大生命期
    },
    store: sessionStore,  //存储管理器
    resave: false,
    saveUninitialized: false
}));

router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
