const { Model } = require('objection');
const tableNames = require('../../database/table_names');
const { v4: uuidv4 } = require('uuid');

class Promotion extends Model {
  static get tableName() {
    return tableNames.promotion;
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
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: require('../products/model'),
        join: {
          from: 'promotion.uuid',
          through: {
            from: 'promotion_product.promotion_uuid',
            to: 'promotion_product.product_uuid',
          },
          to: 'product.uuid',
        },
      },
      store: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../stores/model'),
        join: {
          from: 'promotion.store_uuid',
          to: 'store.uuid',
        },
      },
      campaign: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../marketing_campaigns/model'),
        join: {
          from: 'promotion.campaign_uuid',
          to: 'marketing_campaign.uuid',
        },
      },
    };
  }
}

module.exports = Promotion;
