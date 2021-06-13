const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.planning_cart, (table) => {
    table.uuid('uuid').primary();
    table.uuid('app_user_uuid').references('app_user.uuid').onDelete('CASCADE');
    table.string('name').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.planning_cart);
};
