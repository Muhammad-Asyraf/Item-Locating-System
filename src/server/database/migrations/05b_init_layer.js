const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.layer, (table) => {
    table.uuid('uuid').primary();
    table.string('shape').notNullable();
    table.json('layer_coordinate').notNullable();
    table.json('meta_data').notNullable();
    table.uuid('layout_uuid').references('layout.uuid').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.layer);
};
