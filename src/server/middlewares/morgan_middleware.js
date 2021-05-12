const morgan = require('morgan');
const getLogger = require('../utils/logger');

const morganLogger = getLogger(__filename, 'http');

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
  write: (message) => {
    const removedNewLine = message.substring(0, message.lastIndexOf('\n'));
    morganLogger.http(removedNewLine);
  },
};

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

// create & customize morgan middlewares
exports.request = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

exports.response = morgan(':method :url', {
  stream,
  skip,
  immediate: true,
});
