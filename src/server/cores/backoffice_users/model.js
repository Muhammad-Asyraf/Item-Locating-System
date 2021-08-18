const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class BackofficeUser extends Model {
  static get tableName() {
    return tableNames.backoffice_user;
  }

  static get idColumn() {
    return 'uuid';
  }

  /* eslint-disable no-param-reassign */
  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      title: 'Backoffice',
      description: 'The backoffice schema',
      required: ['uuid', 'full_name', 'email', 'password'],
      properties: {
        uuid: {
          $id: '#/properties/uuid',
          type: 'string',
          format: 'uuid',
          title: 'The uuid schema',
          description: 'The backoffice uuid.',
          examples: ['1dafa876-7f8c-45f8-a39a-a43d3d7774c3'],
        },
        full_name: {
          $id: '#/properties/full_name',
          type: 'string',
          title: 'The full_name schema',
          description: 'The customer first name.',
          examples: ['Muhammad Asyraf'],
        },
        email: {
          $id: '#/properties/email',
          type: 'string',
          title: 'The email schema',
          description: 'The backoffice email. must be unique',
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
          title: 'The creation date of the backoffice.',
        },
        updated_at: {
          $id: '#/properties/updated_at',
          type: 'string',
          title: 'The date the backoffice was last updated.',
        },
      },
      additionalProperties: false,
    };
  }
}

module.exports = BackofficeUser;
