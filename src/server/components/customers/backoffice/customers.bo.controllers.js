const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const Customer = require('../customers.model');
const { getLogger } = require('../../../utils/logger.util');
const { highlight } = require('../../../utils/general.util');

const customerLogger = getLogger(__filename, 'customer');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.query();
    customerLogger.info(
      `Successfully retrieve customers: ${highlight(
        customers.length
      )} customers`
    );
    res.json(customers);
  } catch (err) {
    customerLogger.error(`Error: ${highlight(err.message)}`);
    res.json(err);
  }
};

exports.register = async (req, res) => {
  try {
    const { password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const customer = await Customer.query().insert({
      ...req.body,
      UUID: uuidv4(),
      password: encryptedPassword,
    });
    customerLogger.info(
      `Customer successfully created with ${highlight(
        `[UUID - ${customer.UUID}]`
      )}`
    );
    res.json(customer);
  } catch (err) {
    res.json(err);
    customerLogger.error(`Error creating customer: ${highlight(err.message)}`);
  }
};
