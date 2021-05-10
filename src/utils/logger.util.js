const winston = require('winston');
const config = require('../config/log/info.logger.config');

const logger = winston.createLogger(config);

module.exports = logger;
