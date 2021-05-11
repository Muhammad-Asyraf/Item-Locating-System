const winston = require('winston');
const {
  getTimeStamp,
  getFileLoggingFormat,
  getConsoleLoggingFormat,
  getNamespace,
} = require('./general.util');

const { loggers, format, transports } = winston;
const { timestamp, printf, combine, label } = format;
const { Console, File } = transports;

const getLogger = (moduleName, logFile) => {
  const nameSpace = getNamespace(moduleName);
  if (!winston.loggers.has(nameSpace)) {
    loggers.add(nameSpace, {
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
          format: getConsoleLoggingFormat(printf),
        }),
        new File({
          filename: './logs/info.log',
          level: 'info',
          format: getFileLoggingFormat(printf),
        }),
        new File({
          filename: './logs/error.log',
          level: 'error',
          format: getFileLoggingFormat(printf),
        }),
        new File({
          filename: './logs/debug.log',
          level: 'debug',
          format: getFileLoggingFormat(printf),
        }),
        new File({
          filename: './logs/uncaught.exception.log',
          handleExceptions: true,
          format: getFileLoggingFormat(printf),
        }),
        new File({
          filename: './logs/uncaught.promise.rejections.log',
          handleRejections: true,
          format: getFileLoggingFormat(printf),
        }),
        new File({
          filename: `./logs/${logFile}.log`,
          format: getFileLoggingFormat(printf),
        }),
      ],
    });
  }
  return winston.loggers.get(nameSpace);
};

module.exports = {
  getLogger,
};
