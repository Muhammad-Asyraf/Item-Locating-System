const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class AppUser extends Model {
  static get tableName() {
    return tableNames.app_user;
  }

  static get idColumn() {
    return 'uuid';
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  static get relationMappings() {
    return {
      planning_carts: {
        relation: Model.HasManyRelation,
        modelClass: require('../planning_carts/model'),
        join: {
          from: 'app_user.uuid',
          to: 'planning_cart.app_user_uuid',
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      title: 'App user',
      description: 'The app user schema',
      required: ['uuid', 'email', 'username', 'password'],
      properties: {
        uuid: {
          $id: '#/properties/uuid',
          type: 'string',
          format: 'uuid',
          title: 'The uuid schema',
          description: 'The app user uuid.',
          examples: ['1dafa876-7f8c-45f8-a39a-a43d3d7774c3'],
        },
        full_name: {
          $id: '#/properties/full_name',
          type: 'string',
          title: 'The full_name schema',
          description: 'The app user first name.',
          examples: ['Muhammad Asyraf'],
        },
        email: {
          $id: '#/properties/email',
          type: 'string',
          title: 'The email schema',
          description: 'The app user email. must be unique',
          examples: ['asyraf.rmc@gmail.com'],
        },
        username: {
          $id: '#/properties/username',
          type: 'string',
          title: 'The username schema',
          description: 'The app user username. must be unique',
          examples: ['asyraf131'],
        },
        password: {
          $id: '#/properties/password',
          type: 'string',
          title: 'The users hashed password.',
        },
        created_at: {
          $id: '#/properties/created_at',
          type: 'string',
          title: 'The creation date of the app user.',
        },
        updated_at: {
          $id: '#/properties/updated_at',
          type: 'string',
          title: 'The date the app user was last updated.',
        },
      },
      additionalProperties: false,
    };
  }
}

module.exports = AppUser;
