const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// luodaan Express app
const app = express();
module.exports = app;

// tietokantayhteys
logger.info('connecting to MongoDB...');
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => logger.info('connected to MongoDB"'))
  .catch((err) =>
    logger.error('error while connecting to MongoDB:', err.message),
  );

// globaalit middlewaret
app.use(express.json());
app.use(morgan('tiny'));

// reitittimet
const blogsRouter = require('./controllers/blogs');
app.use('/api/blogs', blogsRouter);

// virheidenkäsittelyn middlewaret
app.use(middleware.noEndpoint);
app.use(middleware.globalErrorHandler);
