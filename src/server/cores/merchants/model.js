const { Model } = require('objection');
const tableNames = require('../../utils/table_names');

class Merchant extends Model {
  static get tableName() {
    return tableNames.merchant;
  }

  static get idColumn() {
    return 'UUID';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      title: 'Merchant',
      description: 'The merchant schema',
      required: ['UUID', 'email', 'password'],
      properties: {
        UUID: {
          $id: '#/properties/UUID',
          type: 'string',
          format: 'uuid',
          title: 'The UUID schema',
          description: 'The merchant UUID.',
          examples: ['1dafa876-7f8c-45f8-a39a-a43d3d7774c3'],
        },
        email: {
          $id: '#/properties/email',
          type: 'string',
          title: 'The email schema',
          description: 'The merchant email. must be unique',
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
          title: 'The creation date of the merchant.',
        },
        updated_at: {
          $id: '#/properties/updated_at',
          type: 'string',
          title: 'The date the merchant was last updated.',
        },
      },
      additionalProperties: false,
    };
  }
}

module.exports = Merchant;
