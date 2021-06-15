const { Model } = require('objection');
const tableNames = require('../../database/table_names');

class PlanningCart extends Model {
  static get tableName() {
    return tableNames.planning_cart;
  }

  static get idColumn() {
    return 'uuid';
  }

  static get relationMappings() {
    return {
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: require('../products/model'),
        join: {
          from: 'planning_cart.uuid',
          through: {
            from: 'planning_cart_product.cart_uuid',
            to: 'planning_cart_product.product_uuid',
            extra: ["quantity","total_price"]
          },
          to: 'product.uuid',
        },
      },
      app_user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../app_users/model'),
        join: {
          from: 'planning_cart.app_user_uuid',
          to: 'app_user.uuid',
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
          uuid: '12fb31aa-0f41-4128-bbc8-dee647d4ac14',
          app_user_uuid: '',
          created_at: '2021-06-13T06:11:20.682Z',
          updated_at: '2021-06-13T06:11:20.682Z',
          name: 'My Monthly go to cart',
        },
      ],
      required: ['uuid', 'app_user_uuid', 'name'],
      properties: {
        uuid: {
          $id: '#/properties/uuid',
          type: 'string',
          title: 'The uuid schema',
          description: 'An explanation about the purpose of this instance.',
          examples: ['12fb31aa-0f41-4128-bbc8-dee647d4ac14'],
        },
        app_user_uuid: {
          $id: '#/properties/app_user_uuid',
          type: 'string',
          title: 'The app_user_uuid schema',
          description: 'An explanation about the purpose of this instance.',
          examples: [''],
        },
        name: {
          $id: '#/properties/name',
          type: 'string',
          title: 'The name schema',
          description: 'An explanation about the purpose of this instance.',
          examples: ['My Monthly go to cart'],
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
      additionalProperties: true,
    };
  }
}

module.exports = PlanningCart;
