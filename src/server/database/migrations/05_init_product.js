const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.product, (table) => {
    table.uuid('uuid').primary();
    table.string('name').notNullable();
    table.boolean('is_active').notNullable();
    table.string('description').notNullable();
    table.decimal('retail_price').notNullable();
    table.decimal('selling_price').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.product);
};
