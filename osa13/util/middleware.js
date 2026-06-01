const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map((e) => e.message);
    res.status(400).json({ error: messages });
  } else if (err.name === 'Error') {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).end();
  }
  console.log(err);
  return next(err);
};

module.exports = { errorHandler };
