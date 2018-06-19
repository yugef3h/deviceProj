var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.all('*', function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", '*');
  //res.header("Access-Control-Allow-Origin", null);
  res.header("Access-Control-Allow-Origin", "http://localhost:63342");  //localhost & devDependencies
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type, Authorization,Content-Length, ");
  res.header('Access-Control-Allow-Credentials', true); //cookies
  res.header('Access-Control-Max-Age','1728000'); // http preflight request is volid 20 days
  res.header("X-Powered-By", '3.2.1')
  if(req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// http://IP:port/api/
app.use('/api', usersRouter);

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
