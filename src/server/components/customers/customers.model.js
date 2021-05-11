const { Model } = require('objection');
const tableNames = require('../../utils/table.names.util');
const schema = require('./customers.schema.json');

class Customer extends Model {
  static get tableName() {
    return tableNames.customer;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Customer;
