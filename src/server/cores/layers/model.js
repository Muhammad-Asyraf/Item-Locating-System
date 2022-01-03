const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class Layer extends Model {
  static get tableName() {
    return tableNames.layer;
  }

  static get idColumn() {
    return 'uuid';
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      layout: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../layouts/model'),
        join: {
          from: 'layer.layout_uuid',
          to: 'layout.uuid',
        },
      },
    };
  }
}

module.exports = Layer;
