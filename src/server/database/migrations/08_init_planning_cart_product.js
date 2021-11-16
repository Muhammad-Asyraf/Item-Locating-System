const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.planning_cart_product, (table) => {
    table.increments('id').primary();
    table.uuid('cart_uuid').references('planning_cart.uuid').onDelete('CASCADE');
    table.uuid('product_uuid').references('product.uuid').onDelete('CASCADE');
    table.integer('quantity');
    table.decimal('total_price')
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.planning_cart_product);
};
