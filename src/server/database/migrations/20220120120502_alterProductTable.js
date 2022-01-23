const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.alterTable(tableNames.product, (table) => {
    table.dropColumn('partition_uuid');
  });

  await knex.schema.alterTable(tableNames.product, (table) => {
    table.uuid('partition_uuid').references('layer.uuid').onDelete('SET NULL');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable(tableNames.product, (table) => {
    table.dropColumn('partition_uuid');
  });
  await knex.schema.alterTable(tableNames.product, (table) => {
    table.uuid('partition_uuid').references('layer.uuid').onDelete('CASCADE');
  });
};
