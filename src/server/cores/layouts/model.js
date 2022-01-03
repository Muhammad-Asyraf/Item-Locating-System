const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class Layout extends Model {
  static get tableName() {
    return tableNames.layout;
  }

  static get idColumn() {
    return 'uuid';
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      layers: {
        relation: Model.HasManyRelation,
        modelClass: require('../layers/model'),
        join: {
          from: 'layout.uuid',
          to: 'layer.layout_uuid',
        },
      },
      store: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../stores/model'),
        join: {
          from: 'layout.store_uuid',
          to: 'store.uuid',
        },
      },
    };
  }
}

module.exports = Layout;
