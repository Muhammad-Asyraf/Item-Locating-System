const { Model } = require('objection');
const tableNames = require('../../database/table_names');
const { v4: uuidv4 } = require('uuid');

class Product extends Model {
  static get tableName() {
    return tableNames.product;
  }

  static get idColumn() {
    return 'uuid';
  }

  $beforeInsert() {
    this.uuid = uuidv4();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      items: {
        relation: Model.ManyToManyRelation,
        modelClass: require('../items/model'),
        join: {
          from: 'product.uuid',
          through: {
            from: 'item_product.product_uuid',
            to: 'item_product.item_uuid',
            extra: {
              quantity: 'item_quantity',
            },
          },
          to: 'item.uuid',
        },
      },
      promotions: {
        relation: Model.ManyToManyRelation,
        modelClass: require('../promotions/model'),
        join: {
          from: 'product.uuid',
          through: {
            from: 'promotion_product.product_uuid',
            to: 'promotion_product.promotion_uuid',
          },
          to: 'promotion.uuid',
        },
      },
      planning_carts: {
        relation: Model.ManyToManyRelation,
        modelClass: require('../planning_carts/model'),
        join: {
          from: 'product.uuid',
          through: {
            from: 'planning_cart_product.product_uuid',
            to: 'planning_cart_product.cart_uuid',
            extra: ['quantity', 'total_price'],
          },
          to: 'planning_cart.uuid',
        },
      },
      sub_categories: {
        relation: Model.ManyToManyRelation,
        modelClass: require('../categories/sub_categories/model'),
        join: {
          from: 'product.uuid',
          through: {
            from: 'product_sub_category.product_uuid',
            to: 'product_sub_category.sub_category_uuid',
          },
          to: 'sub_category.uuid',
        },
      },
      images: {
        relation: Model.HasManyRelation,
        modelClass: require('../images/model'),
        join: {
          from: 'product.uuid',
          to: 'image.product_uuid',
        },
      },
      stores: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../stores/model'),
        join: {
          from: 'product.store_uuid',
          to: 'store.uuid',
        },
      },
    };
  }

  // static get jsonSchema() {
  //   return {
  //     type: 'object',
  //     title: 'The product schema',
  //     required: [
  //       'uuid',
  //       'name',
  //       'description',
  //       'is_active',
  //       'retail_price',
  //       'selling_price',
  //     ],
  //     properties: {
  //       uuid: {
  //         $id: '#/properties/uuid',
  //         type: 'string',
  //         title: 'The uuid schema',
  //         description: 'An explanation about the purpose of this instance.',
  //         default: '',
  //         examples: ['1dafa876-7f8c-45f8-a39a-a43d3d7774c3'],
  //       },
  //       name: {
  //         $id: '#/properties/name',
  //         type: 'string',
  //         title: 'The name schema',
  //         description: 'An explanation about the purpose of this instance.',
  //         default: '',
  //         examples: ['Toothbrush'],
  //       },
  //       description: {
  //         $id: '#/properties/description',
  //         type: 'string',
  //         title: 'The description schema',
  //         description: 'An explanation about the purpose of this instance.',
  //         default: '',
  //         examples: ['Colgate Toothbursh'],
  //       },
  //       is_active: {
  //         $id: '#/properties/description',
  //         type: 'boolean',
  //         title: 'The description schema',
  //         description: 'An explanation about the purpose of this instance.',
  //         default: '',
  //         examples: [true],
  //       },
  //       retail_price: {
  //         $id: '#/properties/retail_price',
  //         type: 'number',
  //         title: 'The retail_price schema',
  //         description: 'An explanation about the purpose of this instance.',
  //         default: 0.0,
  //         examples: [5.9],
  //       },
  //       selling_price: {
  //         $id: '#/properties/selling_price',
  //         type: 'number',
  //         title: 'The selling_price schema',
  //         description: 'An explanation about the purpose of this instance.',
  //         default: 0.0,
  //         examples: [2.9],
  //       },
  //       // store_uuid: {
  //       //   $id: '#/properties/store_uuid',
  //       //   type: 'string',
  //       //   title: 'The store_uuid schema',
  //       //   description: 'An explanation about the purpose of this instance.',
  //       //   default: '',
  //       //   examples: ['1dafa876-7f8c-45f8-a39a-a43d3d7774c3'],
  //       // },
  //     },
  //     additionalProperties: false,
  //   };
  // }
}

module.exports = Product;
