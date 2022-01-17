const { Model } = require('objection');
const tableNames = require('../../database/table_names');
const { v4: uuidv4 } = require('uuid');

class MarketingCampaign extends Model {
  static get tableName() {
    return tableNames.marketing_campaign;
  }

  static get idColumn() {
    return 'uuid';
  }

  $beforeInsert() {
    this.uuid = uuidv4();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      promotions: {
        relation: Model.HasManyRelation,
        modelClass: require('../promotions/model'),
        join: {
          from: 'marketing_campaign.uuid',
          to: 'promotion.campaign_uuid',
        },
      },
      store: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../stores/model'),
        join: {
          from: 'marketing_campaign.store_uuid',
          to: 'store.uuid',
        },
      },
    };
  }
}

module.exports = MarketingCampaign;
