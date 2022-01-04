const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.alterTable(tableNames.app_user, (table) => {
    table.string('phone_country_code');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable(tableNames.app_user, (table) => {
    table.dropColumn('phone_country_code');
  });
};
