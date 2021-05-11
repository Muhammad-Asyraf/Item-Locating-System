const db = require('./database/connection/db');
const loketla = require('./loketla');
const { getLogger } = require('./utils/logger.util');
const { highlight } = require('./utils/general.util');

const PORT = process.env.PORT || 8000;

const databaseLogger = getLogger(__filename, 'server');

db.setupConnection
  .then(
    loketla.listen(PORT, () => {
      databaseLogger.info(`LOKETLA listening on port => ${highlight(PORT)}`);
    })
  )
  .catch((err) => {
    console.log(err);
    databaseLogger.error(
      `Database connection error: ${highlight(err.message)}`
    );
  });
