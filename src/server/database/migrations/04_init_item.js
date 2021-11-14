const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.item, (table) => {
    table.uuid('uuid').primary();
    table.string('name').notNullable();
    table.bigInteger('barcode_number').notNullable().unique();
    table.decimal('wholesale_price').notNullable();
    table
      .uuid('store_uuid')
      .references('store.uuid')
      .onDelete('CASCADE')
      .notNullable();
    table.timestamps(true, true);
    table.text('note');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.item);
};
