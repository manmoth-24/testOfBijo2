var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var ouboRouter = require('./routes/oubo');
var explainRouter = require('./routes/explain.js');
var findRouter = require('./routes/find.js');
var hiddenRouter = require('./routes/hidden.js');
var rankRouter = require('./routes/rank.js');
var searchRouter = require('./routes/search.js');
var voteRouter = require('./routes/vote.js')

var loginRouter = require('./routes/login.js');
var loginResultRouter = require('./routes/loginResult.js')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session_opt = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}
app.use(session(session_opt))

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/oubo', ouboRouter);
app.use('/explain', explainRouter);
app.use('/find', findRouter);
app.use('/hidden', hiddenRouter);
app.use('/rank', rankRouter);
app.use('/search', searchRouter);
app.use('/vote', voteRouter);

app.use('/login', loginRouter);
app.use('/loginResult', loginResultRouter)

app.use(express.static('./views'))

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
