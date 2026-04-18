const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const path = require('node:path');
const express = require('express');
const mongoose = require('mongoose');

// luodaan Express app
const app = express();
module.exports = app;

// tietokantayhteys
logger.info('connecting to MongoDB...');
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => logger.info('connected to MongoDB'))
  .catch((err) =>
    logger.error('error while connecting to MongoDB:', err.message),
  );

// globaalit middlewaret
app.use(express.json());
app.use(middleware.addRequestLogger());
app.use(middleware.tokenExtractor);

// jaa tuotantovaiheessa bundlattu frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

// reitittimet
const blogsRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

// vain testeissä käytettävä nollausreitti
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

// ohjaa tuotantovaihessa API-reittien jälkeen React Routerin määrittämät reitit
if (process.env.NODE_ENV === 'production') {
  app.get('/*route', (req, res) =>
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html')),
  );
}

// virheidenkäsittelyn middlewaret
app.use(middleware.noEndpoint);
app.use(middleware.globalErrorHandler);
