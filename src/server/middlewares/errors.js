const getLogger = require('../utils/logger');

const errorLogger = getLogger(__filename, 'server');
const errorTypes = {
  ValidationError: 422,
  UniqueViolationError: 409,
};
const errorMessages = {
  UniqueViolationError: 'Already exists.',
};

const endpointNotFound = (req, res, next) => {
  const error = new Error(
    `Can't ${req.method} ${req.originalUrl} on this server! `
  );
  errorLogger.warn(error.message);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res) => {
  const statusCode =
    res.statusCode === 200 ? errorTypes[error.name] || 500 : res.statusCode;
  res.status(statusCode);
  const response = {
    status: statusCode,
    message: errorMessages[error.name] || error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    errors: error.errors || undefined,
  };
  errorLogger.error(
    `Response status: ${response.status} | Response message: ${response.message} | Response stack: ${response.stack}`
  );
  res.json(response);
};

module.exports = {
  endpointNotFound,
  errorHandler,
};
