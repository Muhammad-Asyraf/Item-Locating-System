const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.item_product, (table) => {
    table.increments('id').primary();
    table.uuid('product_uuid').references('product.uuid').onDelete('CASCADE');
    table.uuid('item_uuid').references('item.uuid').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.item_product);
};
