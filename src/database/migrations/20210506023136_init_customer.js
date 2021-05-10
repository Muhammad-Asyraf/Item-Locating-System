const tableNames = require('../../utils/table.names.util');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.customer, (table) => {
    table.increments().notNullable();
    table.uuid('UUID').notNullable().unique();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.customer);
};
