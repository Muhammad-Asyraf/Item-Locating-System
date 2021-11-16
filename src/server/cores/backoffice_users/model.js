const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class BackofficeUser extends Model {
  static get tableName() {
    return tableNames.backoffice_user;
  }

  static get idColumn() {
    return 'uuid';
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  /* eslint-disable no-param-reassign */
  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  static get relationMappings() {
    return {
      stores: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../stores/model'),
        join: {
          from: 'backoffice_user.store_uuid',
          to: 'store.uuid',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      title: 'Backoffice',
      description: 'The backoffice schema',
      required: [
        'uuid',
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'password',
      ],
      properties: {
        uuid: {
          $id: '#/properties/uuid',
          type: 'string',
          format: 'uuid',
          title: 'The uuid schema',
          description: 'The backoffice uuid.',
          examples: ['1dafa876-7f8c-45f8-a39a-a43d3d7774c3'],
        },
        first_name: {
          $id: '#/properties/first_name',
          type: 'string',
          title: 'The first_name schema',
          description: 'The customer first name.',
          examples: ['Muhammad Asyraf'],
        },
        last_name: {
          $id: '#/properties/last_name',
          type: 'string',
          title: 'The last_name schema',
          description: 'The customer first name.',
          examples: ['Bin Zafrul Hisham'],
        },
        email: {
          $id: '#/properties/email',
          type: 'string',
          title: 'The email schema',
          description: 'The backoffice email. must be unique',
          examples: ['asyraf.rmc@gmail.com'],
        },
        phone_number: {
          $id: '#/properties/phone_number',
          type: 'string',
          title: 'The phone_number schema',
          description: 'The backoffice phone_number.',
          examples: ['0194576843'],
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
      additionalProperties: true,
    };
  }
}

module.exports = BackofficeUser;
