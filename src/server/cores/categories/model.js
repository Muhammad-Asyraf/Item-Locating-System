const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class Category extends Model {
  static get tableName() {
    return tableNames.category;
  }

  static get idColumn() {
    return 'uuid';
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      image: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../images/model'),
        join: {
          from: 'category.image_uuid',
          to: 'image.uuid',
        },
      },
      sub_categories: {
        relation: Model.HasManyRelation,
        modelClass: require('./sub_categories/model'),
        join: {
          from: 'category.uuid',
          to: 'sub_category.category_uuid',
        },
      },
    };
  }
}

module.exports = Category;
