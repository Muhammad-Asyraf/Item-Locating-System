const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.alterTable(tableNames.product, (table) => {
    table.dropColumn('layout_uuid');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable(tableNames.product, (table) => {
    table.uuid('layout_uuid').references('layout.uuid').onDelete('CASCADE');
  });
};
