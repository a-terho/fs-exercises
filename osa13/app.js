const express = require('express');
const app = express();
module.exports = app;

const blogRouter = require('./routes/blogs.js');
const userRouter = require('./routes/users.js');
const loginRouter = require('./routes/login.js');
const { errorHandler } = require('./util/middleware.js');

app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(errorHandler);
