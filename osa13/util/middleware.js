const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError' || err.name === 'Error') {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).end();
  }

  console.log(err);
  return next(err);
};

module.exports = { errorHandler };
