const tableNames = require('../database/table_names');

exports.up = async (knex) => {
  await knex.schema.alterTable(tableNames.image, (table) => {
    table
      .uuid('marketing_campaign_uuid')
      .references('marketing_campaign.uuid')
      .onDelete('CASCADE');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable(tableNames.image, (table) => {
    table.dropColumn('marketing_campaign_uuid');
  });
};
