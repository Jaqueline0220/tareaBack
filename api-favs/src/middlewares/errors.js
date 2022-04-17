const { HttpException } = require('../errors');
const { log } = require('../helpers/logger');

const errorLogger = (err, _req, _res, next) => {
  log.error(err.message, err.scope);
  next(err);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  if (err instanceof HttpException) {
    res.status(err.status).json({
      status: err.status,
      errors: {
        message: err.message,
      },
    });
  } else {
    res.status(500).json({
      status: 500,
      errors: {
        message: 'Internal Server Error',
      },
    });
  }
};

module.exports = {
  errorLogger,
  errorHandler,
};
