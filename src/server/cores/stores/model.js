const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class Store extends Model {
  static get tableName() {
    return tableNames.store;
  }

  static get idColumn() {
    return 'uuid';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      title: 'The store schema',
      description: 'The store schema comprises the entire JSON document.',
      default: {},
      examples: [
        {
          uuid: '115e4bac-b2e5-4c68-8492-18dbbb61beeb',
          name: 'Kedai Runcit Pak Munawir',
        },
      ],
      required: ['uuid', 'name'],
      properties: {
        uuid: {
          $id: '#/properties/uuid',
          type: 'string',
          title: 'The uuid schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['115e4bac-b2e5-4c68-8492-18dbbb61beeb'],
        },
        name: {
          $id: '#/properties/name',
          type: 'string',
          title: 'The name schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['Kedai Runcit Pak Munawir'],
        },
      },
      additionalProperties: false,
    };
  }
}

module.exports = Store;
