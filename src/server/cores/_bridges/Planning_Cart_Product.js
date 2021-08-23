const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class PlanningCartProduct extends Model {
  static get tableName() {
    return tableNames.planning_cart_product;
  }

  static get idColumn() {
    return ['card_uuid', 'product_uuid'];
  }

  static get relationMappings() {
    return {
      planning_cart: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../planning_carts/model'),
        join: {
          from: 'planning_cart_product.cart_uuid',
          to: 'planning_card.uuid',
        },
      },

      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../products/model'),
        join: {
          from: 'planning_card_product.product_uuid',
          to: 'product.uuid',
        },
      },
    };
  }
}

module.exports = PlanningCartProduct;
