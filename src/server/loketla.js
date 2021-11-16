const express = require('express');
const { endpointNotFound, errorHandler } = require('./middlewares/errors');
const morganMiddleware = require('./middlewares/morgan_middleware');
const getLogger = require('./utils/logger');
const path = require('path');

const loketla = express();
const appLogger = getLogger(__filename, 'server');
const _publicFolderPath = path.join(__dirname, '/public');

appLogger.info('🏁 entering LOKETLA request response cycle 🏁');
appLogger.info(_publicFolderPath);

loketla.use(express.json());
loketla.use(express.urlencoded({ extended: false }));

loketla.use(morganMiddleware.request);
loketla.use(morganMiddleware.response);

loketla.use(_publicFolderPath, express.static('/app/public/'));
loketla.use(express.static('/app/public/'));
loketla.use('/api', require('./apis/router'));

loketla.use(endpointNotFound);
loketla.use(errorHandler);

module.exports = loketla;
