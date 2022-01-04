const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.alterTable(tableNames.app_user, (table) => {
    table.string('first_name');
    table.string('last_name');
    table.date('birth_date');
    table.string('phone');
    table.dropColumn('full_name');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable(tableNames.app_user, (table) => {
    table.string('full_name');
    table.dropColumn('first_name');
    table.dropColumn('last_name');
    table.dropColumn('birth_date');
    table.dropColumn('phone');
  });
};
