const setupObjection = require('./database/db');
const loketla = require('./loketla');
const getLogger = require('./utils/logger');

const PORT = process.env.PORT || 8000;
const serverLogger = getLogger(__filename, 'server');

setupObjection();
loketla.listen(PORT, () => {
  serverLogger.info(`LOKETLA listening at http://localhost:${PORT}`);
});
