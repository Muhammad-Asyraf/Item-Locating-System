const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const Customer = require('../model');
const getLogger = require('../../../utils/logger');

const customerLogger = getLogger(__filename, 'customer');

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.query();
    customerLogger.info(
      `Successfully retrieve customers: ${customers.length} customers`
    );
    res.json(customers);
  } catch (err) {
    customerLogger.warn(`Error retrieving all customers`);
    next(err);
  }
};

exports.findCustomer = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const customer = await Customer.query().findById(uuid);
    customerLogger.info(`Successfully retrieve customer: ${customer.UUID}`);
    res.json(customer);
  } catch (err) {
    customerLogger.warn(`Error retrieving customer`);
    next(err);
  }
};

exports.removeCustomer = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    await Customer.query().deleteById(uuid);
    const logMessage = `Successfully delete customer: ${uuid}`;
    customerLogger.info(logMessage);
    res.json({ message: logMessage });
  } catch (err) {
    customerLogger.warn(`Error deleting customer`);
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const customer = await Customer.query().insert({
      ...req.body,
      UUID: uuidv4(),
      password: encryptedPassword,
    });
    customerLogger.info(
      `Customer successfully created with [UUID -${customer.UUID}]`
    );
    res.json(customer);
  } catch (err) {
    customerLogger.warn(`Error creating customer`);
    next(err);
  }
};
