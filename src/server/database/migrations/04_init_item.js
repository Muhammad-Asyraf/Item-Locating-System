const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.item, (table) => {
    table.uuid('uuid').primary();
    table.string('name').notNullable();
    table.bigInteger('barcode_number').notNullable();
    table.decimal('wholesale_price').notNullable();
    table
      .uuid('store_uuid')
      .references('store.uuid')
      .onDelete('CASCADE')
      .notNullable();
    table.text('note');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.item);
};
