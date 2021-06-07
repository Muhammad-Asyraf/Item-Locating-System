const tableNames = require('../../utils/table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.merchant, (table) => {
    table.increments().notNullable();
    table.uuid('UUID').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.merchant);
};
