const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class ItemSubCategory extends Model {
  static get tableName() {
    return tableNames.item_sub_category;
  }

  static get idColumn() {
    return ['sub_category_uuid', 'item_uuid'];
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
          from: 'item_sub_category.sub_category_uuid',
          to: 'sub_category.uuid',
        },
      },
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../items/model'),
        join: {
          from: 'item_sub_category.item_uuid',
          to: 'item.uuid',
        },
      },
    };
  }
}

module.exports = ItemSubCategory;
