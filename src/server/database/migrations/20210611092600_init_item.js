const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.item, (table) => {
    table.uuid('uuid').primary();
    table.string('name').notNullable();
    table.bigInteger('barcode_number').notNullable().unique();
    table.integer('quantity').notNullable();
    table.string('descriptions').notNullable();
    table.decimal('wholesale_price').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.item);
};
