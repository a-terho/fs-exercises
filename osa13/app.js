const express = require('express');
const app = express();
module.exports = app;

const { reset } = require('./models');

const blogRouter = require('./routes/blogs.js');
const userRouter = require('./routes/users.js');
const loginRouter = require('./routes/login.js');
const logoutRouter = require('./routes/logout.js');
const authorRouter = require('./routes/authors.js');
const readinglistRouter = require('./routes/readinglists.js');
const { errorHandler } = require('./util/middleware.js');

app.use(express.json());

app.get('/', (_, res) => res.status(200).end());
app.post('/api/reset', async (_, res) => {
  await reset();
  res.send(204).end();
});

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readinglistRouter);

app.use(errorHandler);
