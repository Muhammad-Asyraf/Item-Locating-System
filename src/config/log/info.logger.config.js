const { format, transports } = require('winston');

const timezoned = () =>
  new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kuala_Lumpur',
  });

module.exports = {
  format: format.combine(
    format.timestamp({
      format: timezoned,
    }),
    format.printf(
      (info) => `[${info.level}] [${info.timestamp}]: ${info.message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
    }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
    }),
    new transports.File({
      filename: './logs/debug.log',
      level: 'debug',
    }),
  ],
};
