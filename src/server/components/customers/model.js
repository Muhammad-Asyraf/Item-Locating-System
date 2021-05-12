const { Model } = require('objection');
const tableNames = require('../../utils/table_names');

class Customer extends Model {
  static get tableName() {
    return tableNames.customer;
  }

  static get idColumn() {
    return 'UUID';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      title: 'Customer',
      description: 'The customer schema',
      required: ['UUID', 'first_name', 'last_name', 'email', 'password'],
      properties: {
        UUID: {
          $id: '#/properties/UUID',
          type: 'string',
          format: 'uuid',
          title: 'The UUID schema',
          description: 'The customer UUID.',
          examples: ['1dafa876-7f8c-45f8-a39a-a43d3d7774c3'],
        },
        first_name: {
          $id: '#/properties/first_name',
          type: 'string',
          title: 'The first_name schema',
          description: 'The customer first name.',
          examples: ['Muhammad'],
        },
        last_name: {
          $id: '#/properties/last_name',
          type: 'string',
          title: 'The last_name schema',
          description: 'The customer last name.',
          examples: ['Asyraf'],
        },
        email: {
          $id: '#/properties/email',
          type: 'string',
          title: 'The email schema',
          description: 'The customer email. must be unique',
          examples: ['asyraf.rmc@gmail.com'],
        },
        password: {
          $id: '#/properties/password',
          type: 'string',
          title: 'The users hashed password.',
        },
        created_at: {
          $id: '#/properties/created_at',
          type: 'string',
          title: 'The creation date of the customer.',
        },
        updated_at: {
          $id: '#/properties/updated_at',
          type: 'string',
          title: 'The date the customer was last updated.',
        },
      },
      additionalProperties: false,
    };
  }
}

module.exports = Customer;
