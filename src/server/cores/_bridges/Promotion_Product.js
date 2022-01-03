const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class PromotionProduct extends Model {
  static get tableName() {
    return tableNames.promotion_product;
  }

  static get idColumn() {
    return ['promotion_uuid', 'product_uuid'];
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      promotion: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../promotions/model'),
        join: {
          from: 'promotion_product.promotion_uuid',
          to: 'promotion.uuid',
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../products/model'),
        join: {
          from: 'promotion_product.product_uuid',
          to: 'product.uuid',
        },
      },
    };
  }
}

module.exports = PromotionProduct;
