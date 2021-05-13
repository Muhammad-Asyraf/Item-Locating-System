const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('./knexfile');
const getLogger = require('../utils/logger');

const databaseLogger = getLogger(__filename, 'server');

const testingConnection = (knex) => {
  knex.schema
    .hasTable('Test')
    .then(() => {
      databaseLogger.info(`Database connection: ✅ working`);
    })
    .catch((err) => {
      databaseLogger.error(`Database connection configs error: ${err.message}`);
    });
};

const setupObjection = () => {
  const environment = process.env.NODE_ENV || 'development';
  const connectionConfig = knexConfig[environment];
  const knex = Knex(connectionConfig);
  testingConnection(knex);
  Model.knex(knex);
};

module.exports = setupObjection;
