const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.product_sub_category, (table) => {
    table.increments('id').primary();
    table
      .uuid('sub_category_uuid')
      .references('sub_category.uuid')
      .onDelete('CASCADE');
    table.uuid('product_uuid').references('product.uuid').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.product_sub_category);
};
