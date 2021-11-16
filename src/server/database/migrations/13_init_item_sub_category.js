const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.item_sub_category, (table) => {
    table.increments('id').primary();
    table
      .uuid('sub_category_uuid')
      .references('sub_category.uuid')
      .onDelete('CASCADE');
    table.uuid('item_uuid').references('item.uuid').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.item_sub_category);
};
