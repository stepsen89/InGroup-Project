'use strict';

const cors = require('cors');

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const index = require('./routes/index');
const auth = require('./routes/auth');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

// -- database

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/project-three', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// -- middlewares
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// -- session
// -- routes

app.use('/', index);
app.use('/auth', auth);

// -- error handlers

// catch 404
app.use((req, res, next) => {
  res.status(404).json({error: 'not found'});
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({error: 'unexpected'});
  }
});

module.exports = app;
