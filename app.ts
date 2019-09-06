import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import redis from 'redis';

dotenv.config();

import apiRouter from './routes/apiRouter';
import usersRouter from './routes/users';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let env = `${process.env.NODE_ENV}`;

env = process.env.NODE_ENV || 'DEVELOPMENT';

let envString = env.toUpperCase();

//  Connection to redis
const redisConn = `${process.env[`REDIS_CONN_${envString}`]}`;
export const client = redis.createClient({ host: redisConn });

// echo redis errors to the console
client.on('error', err => {
  console.log('Error ' + err);
});
client.on('connect', err => {
  console.log(`Connected to Redis @ ${redisConn}`);
});

// Connection to mongoDB

const uri = `${process.env[`ATLAS_URI_${envString}`]}`;

mongoose.set('useFindAndModify', false);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`Connected to mongo @ ${uri}`);
});
connection.on('error', () => {
  console.log('Error Connecting To Database');
});

app.use('/api/v1', apiRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
module.exports = app;
