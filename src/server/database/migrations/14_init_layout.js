const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.layout, (table) => {
    table.uuid('uuid').primary();
    table.string('name').notNullable();
    table.uuid('store_uuid').references('store.uuid').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.layout);
};
