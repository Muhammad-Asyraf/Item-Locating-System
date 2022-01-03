const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.promotion, (table) => {
    table.uuid('uuid').primary();
    table.string('name').notNullable();
    table.datetime('start_date').notNullable();
    table.datetime('end_date').notNullable();
    table.string('promotion_type').notNullable();
    table.json('meta_data').notNullable();
    table
      .uuid('store_uuid')
      .references('store.uuid')
      .onDelete('CASCADE')
      .notNullable();
    table.text('description').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.promotion);
};
