const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class Store extends Model {
  static get tableName() {
    return tableNames.store;
  }

  static get idColumn() {
    return 'uuid';
  }

  static get relationMappings() {
    return {
      backoffice_users: {
        relation: Model.HasManyRelation,
        modelClass: require('../backoffice_users/model'),
        join: {
          from: 'store.uuid',
          to: 'backoffice_user.store_uuid',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      title: 'The root schema',
      description: 'The root schema comprises the entire JSON document.',
      default: {},
      examples: [
        {
          uuid: '115e4bac-b2e5-4c68-8492-18dbbb61beeb',
          storeName: 'Balai Seni Visual Negara (BSVN)',
          storeAddress:
            'Balai Seni Visual Negara (BSVN), 2, Jalan Temerloh, Kuala Lumpur, 53200, Malaysia',
          storeUrl: 'sdfsdf',
          storeCoordinate: {
            longitude: 101.70507597952181,
            latitude: 3.1736149655403443,
          },
        },
      ],
      required: [
        'uuid',
        'store_name',
        'store_address',
        'store_url',
        'store_coordinate',
      ],
      properties: {
        uuid: {
          $id: '#/properties/uuid',
          type: 'string',
          title: 'The uuid schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['115e4bac-b2e5-4c68-8492-18dbbb61beeb'],
        },
        store_name: {
          $id: '#/properties/store_name',
          type: 'string',
          title: 'The store name schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['Balai Seni Visual Negara (BSVN)'],
        },
        store_address: {
          $id: '#/properties/store_address',
          type: 'string',
          title: 'The store address schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: [
            'Balai Seni Visual Negara (BSVN), 2, Jalan Temerloh, Kuala Lumpur, 53200, Malaysia',
          ],
        },
        store_url: {
          $id: '#/properties/store_url',
          type: 'string',
          title: 'The store URL schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['sdfsdf'],
        },
        store_coordinate: {
          $id: '#/properties/store_coordinate',
          type: 'object',
          title: 'The store coordinate schema',
          description: 'An explanation about the purpose of this instance.',
          default: {},
          examples: [
            {
              longitude: 101.70507597952181,
              latitude: 3.1736149655403443,
            },
          ],
          required: ['longitude', 'latitude'],
          properties: {
            longitude: {
              $id: '#/properties/storeCoordinate/properties/longitude',
              type: 'number',
              title: 'The longitude schema',
              description: 'An explanation about the purpose of this instance.',
              default: 0.0,
              examples: [101.70507597952181],
            },
            latitude: {
              $id: '#/properties/storeCoordinate/properties/latitude',
              type: 'number',
              title: 'The latitude schema',
              description: 'An explanation about the purpose of this instance.',
              default: 0.0,
              examples: [3.1736149655403443],
            },
          },
          additionalProperties: true,
        },
        created_at: {
          $id: '#/properties/created_at',
          type: 'string',
          title: 'The creation date of the store.',
        },
        updated_at: {
          $id: '#/properties/updated_at',
          type: 'string',
          title: 'The date the store was last updated.',
        },
      },
      additionalProperties: true,
    };
  }
}

module.exports = Store;

// static get jsonSchema() {
//   return {
//     type: 'object',
//     title: 'The store schema',
//     description: 'The store schema comprises the entire JSON document.',
//     default: {},
//     examples: [
//       {
//         uuid: '115e4bac-b2e5-4c68-8492-18dbbb61beeb',
//         name: 'Kedai Runcit Pak Munawir',
//       },
//     ],
//     required: ['uuid', 'name'],
//     properties: {
//       uuid: {
//         $id: '#/properties/uuid',
//         type: 'string',
//         title: 'The uuid schema',
//         description: 'An explanation about the purpose of this instance.',
//         default: '',
//         examples: ['115e4bac-b2e5-4c68-8492-18dbbb61beeb'],
//       },
//       name: {
//         $id: '#/properties/name',
//         type: 'string',
//         title: 'The name schema',
//         description: 'An explanation about the purpose of this instance.',
//         default: '',
//         examples: ['Kedai Runcit Pak Munawir'],
//       },
//     },
//     additionalProperties: false,
//   };
// }
