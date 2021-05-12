const winston = require('winston');
const moment = require('moment-timezone');
const chalk = require('chalk');
const { getNamespace } = require('./general');

const { loggers, format, transports } = winston;
const { timestamp, printf, combine, label } = format;
const { Console, File } = transports;
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const getTimeStamp = (tz, dateFormat) => {
  return moment().tz(tz).format(dateFormat);
};

const getConsoleLoggingFormat = () => {
  return printf((log) => {
    const logLevel = log.level;
    let formattedMessage = '';

    if (logLevel === 'info') {
      formattedMessage = chalk.black.bgHex('#3c40c6')(
        `[💡 ${chalk.white(logLevel)}]`
      );
    } else if (logLevel === 'warn') {
      formattedMessage = chalk.black.bgHex('#fff200')(`[⚠️ ${logLevel}]`);
    } else if (logLevel === 'error') {
      formattedMessage = chalk.black.bgRed(`[🚨 ${logLevel}]`);
    } else if (logLevel === 'debug') {
      formattedMessage = chalk.black.bgHex('#ced6e0')(`[🛠️  ${logLevel}]`);
    } else if (logLevel === 'http') {
      formattedMessage = chalk.black.bgHex('#17c0eb')(`[🌐 ${logLevel}]`);
    }

    return formattedMessage.concat(
      chalk.white(`[🕒 ${log.timestamp}]`),
      ': ',
      chalk.blue(log.message)
    );
  });
};

const getFileLoggingFormat = () => {
  return printf((log) => {
    return `[${log.level}] :: [${log.timestamp}] :: [${log.label}] ➡️ ${log.message}`;
  });
};

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const getLogger = (moduleName, logFile) => {
  const nameSpace = getNamespace(moduleName);
  if (!winston.loggers.has(nameSpace)) {
    loggers.add(nameSpace, {
      level: level(),
      levels,
      format: combine(
        label({
          label: nameSpace,
        }),
        timestamp({
          format: getTimeStamp('Asia/Kuala_Lumpur', 'DD-MM-YYYY HH:mm:ss'),
        })
      ),
      transports: [
        new Console({
          format: getConsoleLoggingFormat(),
        }),
        new File({
          filename: './logs/info.log',
          level: 'info',
          format: getFileLoggingFormat(),
        }),
        new File({
          filename: './logs/error.log',
          level: 'error',
          format: getFileLoggingFormat(),
        }),
        new File({
          filename: './logs/debug.log',
          level: 'debug',
          format: getFileLoggingFormat(),
        }),
        new File({
          filename: './logs/uncaught.exception.log',
          handleExceptions: true,
          format: getFileLoggingFormat(),
        }),
        new File({
          filename: './logs/uncaught.promise.rejections.log',
          handleRejections: true,
          format: getFileLoggingFormat(),
        }),
        new File({
          filename: `./logs/${logFile}.log`,
          format: getFileLoggingFormat(),
        }),
      ],
    });
  }
  return winston.loggers.get(nameSpace);
};

module.exports = getLogger;
