const knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('../../config/database/knexfile');

exports.setupConnection = new Promise((resolve, reject) => {
  const environment = process.env.NODE_ENV || 'development';
  const connectionConfig = knexConfig[environment];
  try {
    const connection = knex(connectionConfig);
    resolve(Model.knex(connection));
  } catch (err) {
    reject(err);
  }
});
