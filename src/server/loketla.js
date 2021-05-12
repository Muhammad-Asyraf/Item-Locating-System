const express = require('express');
const { endpointNotFound, errorHandler } = require('./middlewares/errors');
const morganMiddleware = require('./middlewares/morgan_middleware');
const getLogger = require('./utils/logger');

const loketla = express();
const appLogger = getLogger(__filename, 'server');

appLogger.info('🏁 entering LOKETLA request response cycle 🏁');

loketla.use(express.json());
loketla.use(express.urlencoded({ extended: false }));
loketla.use(morganMiddleware.request);
loketla.use(morganMiddleware.response);

loketla.use('/api', require('./apis/router'));

loketla.use(endpointNotFound);
loketla.use(errorHandler);

module.exports = loketla;
