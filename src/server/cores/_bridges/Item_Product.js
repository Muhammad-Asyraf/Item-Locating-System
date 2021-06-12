const { Model } = require('objection');
const tableNames = require('../../utils/table_names');

class ItemProduct extends Model {
  static get tableName() {
    return tableNames.item_product;
  }

  static get idColumn() {
    return ['item_uuid', 'product_uuid'];
  }

  static get relationMappings() {
    return {
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../items/model'),
        join: {
          from: 'item_product.item_uuid',
          to: 'item.uuid',
        },
      },

      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../products/model'),
        join: {
          from: 'item_product.product_id',
          to: 'product.uuid',
        },
      },
    };
  }
}

module.exports = ItemProduct;
