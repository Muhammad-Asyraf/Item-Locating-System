const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.store, (table) => {
    table.uuid('uuid').primary();
    table.string('store_name').notNullable();
    table.string('store_address').notNullable();
    table.string('store_url').notNullable().unique();
    table.json('store_coordinate').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.store);
};
