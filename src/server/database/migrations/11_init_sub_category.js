const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.sub_category, (table) => {
    table.uuid('uuid').primary();
    table.string('name').notNullable();
    table.uuid('category_uuid').references('category.uuid').onDelete('CASCADE');
    table.uuid('image_uuid').references('image.uuid').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.sub_category);
};
