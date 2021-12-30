const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.app_user, (table) => {
    table.uuid('uuid').primary();
    // table.string('first_name');
    // table.string('last_name');
    table.string('full_name');
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    // table.date('birth_date');
    // table.string('phone');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.app_user);
};
