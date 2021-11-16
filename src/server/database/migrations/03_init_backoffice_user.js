const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.backoffice_user, (table) => {
    table.uuid('uuid').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('phone_number').notNullable();
    table.uuid('store_uuid').references('store.uuid').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.backoffice_user);
};
