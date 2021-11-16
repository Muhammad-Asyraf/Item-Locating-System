const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.category, (table) => {
    table.uuid('uuid').primary();
    table.string('name').notNullable();
    table.uuid('image_uuid').references('image.uuid').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.category);
};
