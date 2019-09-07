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
const redisPass = `${process.env[`REDIS_CONN_PASS_${envString}`]}`;
const redisHost = `${process.env[`REDIS_CONN_HOST_${envString}`]}`;
let redisPort: any = `${process.env[`REDIS_CONN_PORT_${envString}`]}`;

console.log(envString, redisPort, redisHost);

redisPort = parseInt(redisPort);
export const client = redis.createClient({
  host: redisHost,
  port: redisPort,
  no_ready_check: true,
  auth_pass: redisPass
});

// echo redis errors to the console
client.on('error', err => {
  console.log('Error ' + err);
});
client.on('connect', () => {
  console.log(`Connected to Redis @ ${redisHost}`);
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
app.use(function(_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: express.Request, res: express.Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
module.exports = app;
