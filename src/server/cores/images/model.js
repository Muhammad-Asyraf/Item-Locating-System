const { Model } = require('objection');
const tableNames = require('../../database/table_names');
const { v4: uuidv4 } = require('uuid');

class Image extends Model {
  static get tableName() {
    return tableNames.image;
  }

  static get idColumn() {
    return 'uuid';
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  $beforeInsert() {
    this.uuid = uuidv4();
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.HasOneRelation,
        modelClass: require('../categories/model'),
        join: {
          from: 'image.uuid',
          to: 'category.image_uuid',
        },
      },
      sub_category: {
        relation: Model.HasOneRelation,
        modelClass: require('../categories/sub_categories/model'),
        join: {
          from: 'image.uuid',
          to: 'sub_category.image_uuid',
        },
      },
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../items/model'),
        join: {
          from: 'item.store_uuid',
          to: 'item.uuid',
        },
      },
    };
  }
}

module.exports = Image;
