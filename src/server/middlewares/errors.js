const getLogger = require('../utils/logger');
const stringUtil = require('../utils/string');

const errorLogger = getLogger(__filename, 'server');
const errorTypes = {
  ValidationError: 422,
  UniqueViolationError: 409,
};
const errorMessages = {
  UniqueViolationError: {
    customer_username_unique: stringUtil.getUniqueViolationError('username'),
    customer_email_unique: stringUtil.getUniqueViolationError('email address'),
    store_store_url_unique: stringUtil.getUniqueViolationError('store url'),
    item_barcode_number_unique: "Item's barcode already exist",
    backoffice_user_email_unique:
      stringUtil.getUniqueViolationError('email address'),
  },
};

const endpointNotFound = (req, res, next) => {
  const error = new Error(
    `Can't ${req.method} ${req.originalUrl} on this server! `
  );
  errorLogger.warn(error.message);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  errorLogger.error(JSON.stringify(error));
  const statusCode =
    res.statusCode === 200 ? errorTypes[error.name] || 500 : res.statusCode;
  res.status(statusCode);
  const response = {
    status: statusCode,
    message:
      error.name === 'UniqueViolationError'
        ? errorMessages[error.name][error.nativeError.constraint]
        : error.message,
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
