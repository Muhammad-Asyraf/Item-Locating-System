const { Model } = require('objection');
const tableNames = require('../../../database/table_names');

class SubCategory extends Model {
  static get tableName() {
    return tableNames.sub_category;
  }

  static get idColumn() {
    return 'uuid';
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../model'),
        join: {
          from: 'sub_category.category_uuid',
          to: 'category.uuid',
        },
      },
      image: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../../images/model'),
        join: {
          from: 'sub_category.image_uuid',
          to: 'image.uuid',
        },
      },
      items: {
        relation: Model.ManyToManyRelation,
        modelClass: require('../../items/model'),
        join: {
          from: 'sub_category.uuid',
          through: {
            from: 'item_sub_category.sub_category_uuid',
            to: 'item_sub_category.item_uuid',
          },
          to: 'item.uuid',
        },
      },
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: require('../../products/model'),
        join: {
          from: 'sub_category.uuid',
          through: {
            from: 'product_sub_category.sub_category_uuid',
            to: 'product_sub_category.product_uuid',
          },
          to: 'product.uuid',
        },
      },
    };
  }
}

module.exports = SubCategory;
