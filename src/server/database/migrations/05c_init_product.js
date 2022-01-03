const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.product, (table) => {
    table.uuid('uuid').primary();
    table.string('name').notNullable();
    table.bigInteger('barcode_number').notNullable().unique();
    table.boolean('is_active');
    table.string('stock_status').notNullable();
    table.string('product_type').notNullable();
    table.decimal('measurement_value').notNullable();
    table.string('measurement_unit').notNullable();
    table.decimal('supply_price').notNullable();
    table.decimal('markup_percentage').notNullable();
    table.decimal('retail_price').notNullable();
    table.decimal('selling_price');
    table
      .uuid('store_uuid')
      .references('store.uuid')
      .onDelete('CASCADE')
      .notNullable();
    table.uuid('layout_uuid').references('layout.uuid').onDelete('CASCADE');
    table.uuid('partition_uuid').references('layer.uuid').onDelete('CASCADE');
    table.text('description').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.product);
};
