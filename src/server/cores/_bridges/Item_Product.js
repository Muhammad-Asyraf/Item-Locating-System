const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class ItemProduct extends Model {
  static get tableName() {
    return tableNames.item_product;
  }

  static get idColumn() {
    return ['item_uuid', 'product_uuid'];
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
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
          from: 'item_product.product_uuid',
          to: 'product.uuid',
        },
      },
    };
  }
}

module.exports = ItemProduct;
