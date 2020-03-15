const createError = require('http-errors');
const express = require('express');
require('express-async-errors');
const path = require('path');
// const cookieParser = require('cookie-parser');
const fs = require('fs');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const rfs = require('rotating-file-stream');
const env = process.env.NODE_ENV || 'development';

// const passport = require('passport');
const auth = require('./auth/strategies/local');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const logDir = path.join(__dirname, 'logs');
// ensure log directory exists
fs.existsSync(logDir) || fs.mkdirSync(logDir);

if (env === 'development') {
  app.use(logger('dev'));
} else {
  const logStream = rfs.createStream('server.log', {
    interval: '1d', // rotate daily
    intervalBoundary: true,
    initialRotation: true,
    path: logDir,
  });

  app.use(logger('combined', { stream: logStream }));
}

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8080',
  })
);
app.use(
  session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: false },
  })
);
auth.init(app);
// app.use(passport.initialize());
// app.use(passport.session());

// connect to mongodb
mongoose
  .connect(
    'mongodb://localhost/movie_rating',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log('Connection has been made');
    }
  )
  .catch(err => {
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

// include controllers
const dir = path.join(__dirname, 'controllers');
fs.readdirSync(dir).forEach(file => {
  if (path.extname(file) === '.js') {
    const route = require(path.join(dir, file));
    route.controller(app);
  }
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
