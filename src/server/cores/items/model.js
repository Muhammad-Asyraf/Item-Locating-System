const { Model } = require('objection');
const tableNames = require('../../database/table_names');
const Product = require('../products/model');

class Item extends Model {
  static get tableName() {
    return tableNames.item;
  }

  static get idColumn() {
    return 'uuid';
  }

  static get relationMappings() {
    return {
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: 'item.uuid',
          through: {
            from: 'item_product.item_uuid',
            to: 'item_product.product_uuid',
          },
          to: 'product.uuid',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      title: 'The item schema',
      required: [
        'uuid',
        'name',
        'barcode_number',
        'quantity',
        'descriptions',
        'wholesale_price',
      ],
      properties: {
        uuid: {
          $id: '#/properties/uuid',
          type: 'string',
          title: 'The uuid schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['1dafa876-7f8c-45f8-a39a-a43d3d7774c3'],
        },
        name: {
          $id: '#/properties/name',
          type: 'string',
          title: 'The name schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['Toothbrush'],
        },
        barcode_number: {
          $id: '#/properties/barcode_number',
          type: 'integer',
          title: 'The barcode_number schema',
          description: 'An explanation about the purpose of this instance.',
          default: 0,
          examples: [1845678901001],
        },
        quantity: {
          $id: '#/properties/quantity',
          type: 'integer',
          title: 'The quantity schema',
          description: 'An explanation about the purpose of this instance.',
          default: 0,
          examples: [80],
        },
        descriptions: {
          $id: '#/properties/descriptions',
          type: 'string',
          title: 'The descriptions schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['Colgate Toothbursh'],
        },
        wholesale_price: {
          $id: '#/properties/wholesale_price',
          type: 'number',
          title: 'The wholesale_price schema',
          description: 'An explanation about the purpose of this instance.',
          default: 0.0,
          examples: [18.9],
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

module.exports = Item;
