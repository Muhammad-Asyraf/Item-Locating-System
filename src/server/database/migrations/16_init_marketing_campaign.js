const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.marketing_campaign, (table) => {
    table.uuid('uuid').primary();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.text('terms_conditions').notNullable();
    table.datetime('start_date').notNullable();
    table.datetime('end_date').notNullable();
    table
      .uuid('store_uuid')
      .references('store.uuid')
      .onDelete('CASCADE')
      .notNullable();
    table.uuid('image_uuid').references('image.uuid').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.marketing_campaign);
};
