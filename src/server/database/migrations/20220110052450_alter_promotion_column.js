const tableNames = require('../table_names');

exports.up = async (knex) => {
  await knex.schema.alterTable(tableNames.promotion, (table) => {
    table.uuid('campaign_uuid').nullable().alter();
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable(tableNames.promotion, (table) => {
    table.uuid('campaign_uuid').notNullable().alter();
  });
};
