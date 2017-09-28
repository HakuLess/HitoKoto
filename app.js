var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var hitokoto = require('./routes/hitokoto');
var where = require('./routes/where');
var checkin = require('./routes/checkin');

// var wechat = require('./routes/wechat');
var cors = require('cors');

var config = require('./config');

var wechat = require('wechat');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// wechat
app.use(express.query());
// app.use('/wechat', wechat);
app.use('/', index);

app.use('/wechat', wechat("wechat", function (req, res, next) {
  // 微信输入信息都在req.weixin上 
  var message = req.weixin;

  if (message.MsgType == "text") {
    var str = message.Content.split(" ");
    if (str[0] == "DK") {
      
      var token = message.Content.substring(3);
      checkin.checkInWithDb(token, res);
    }
  }
}));
// app.use('/users', users);
// app.use('/hitokoto', hitokoto);
// app.use('/where', where);


// app.use('/wechat', wechat(config.token, function (req, res, next) {
//   // 微信输入信息都在req.weixin上 
//   var message = req.weixin;
//   if (message.FromUserName === 'diaosi') {
//     // 回复屌丝(普通回复) 
//     res.reply('hehe');
//   } else {
//     res.reply('123');
//   }
// }));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

