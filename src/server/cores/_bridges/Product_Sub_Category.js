const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class ProductSubCategory extends Model {
  static get tableName() {
    return tableNames.product_sub_category;
  }

  static get idColumn() {
    return ['sub_category_uuid', 'product_uuid'];
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      sub_category: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../categories/sub_categories/model'),
        join: {
          from: 'product_sub_category.sub_category_uuid',
          to: 'sub_category.uuid',
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../products/model'),
        join: {
          from: 'product_sub_category.product_uuid',
          to: 'product.uuid',
        },
      },
    };
  }
}

module.exports = ProductSubCategory;
