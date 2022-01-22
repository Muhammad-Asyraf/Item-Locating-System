const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.promotion_product, (table) => {
    table.increments('id').primary();
    table
      .uuid('promotion_uuid')
      .references('promotion.uuid')
      .onDelete('CASCADE');
    table.uuid('product_uuid').references('product.uuid').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.promotion_product);
};
