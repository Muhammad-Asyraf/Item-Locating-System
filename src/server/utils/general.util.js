const moment = require('moment-timezone');
const chalk = require('chalk');

const getTimeStamp = (tz, format) => {
  return moment().tz(tz).format(format);
};

const getConsoleLoggingFormat = (printf) => {
  return printf((log) => {
    const logLevel = log.level;
    let format = '';

    if (logLevel === 'info') {
      format = chalk.black.bgBlue.underline('[💡 ' + logLevel + ']');
    } else if (logLevel === 'warn') {
      format = chalk.black.bgYellowBright.underline('[⚠️ ' + logLevel + ']');
    } else if (logLevel === 'error') {
      format = chalk.black.bgRed.underline('[🚨 ' + logLevel + ']');
    }

    return format.concat(
      ' :: ',
      chalk.white('[🕒 ' + log.timestamp + ']'),
      ' :: ',
      chalk.white('[📁 ' + log.label + ']'),
      ' ➡️ ',
      chalk.blue(log.message)
    );
  });
};

const getFileLoggingFormat = (printf) => {
  return printf((log) => {
    return `[${log.level}] :: [${log.timestamp}] :: [${log.label}] ➡️ ${log.message}`;
  });
};

const getNamespace = (path) => {
  return path.replace(/[^a-zA-Z ]/g, '.').substring(1, path.length - 3);
};

const highlight = (message) => {
  return chalk.white(message);
};

const references = (table, tableName, notNullable = true, columnName = '') => {
  const definition = table
    .integer(`${columnName || tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade')
    .index();
  if (notNullable) {
    definition.notNullable();
  }
  return definition;
};

module.exports = {
  getTimeStamp,
  getConsoleLoggingFormat,
  getFileLoggingFormat,
  getNamespace,
  highlight,
  references,
};
