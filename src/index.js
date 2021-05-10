const db = require('./database/connection/db');
const loketla = require('./loketla');
const logger = require('./utils/logger.util');

const PORT = process.env.PORT || 8000;

db.setupConnection
  .then(
    loketla.listen(PORT, () => {
      logger.info(`LOKETLA listening on port => ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
