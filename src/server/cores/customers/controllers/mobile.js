const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const admin = require('../../../firebase');
const Customer = require('../model');
const getLogger = require('../../../utils/logger');

const customerLogger = getLogger(__filename, 'auth');

exports.signup = async (req, res, next) => {
  let customer;
  const customerUUID = uuidv4();
  const { email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    customer = await Customer.query().insert({
      ...req.body,
      UUID: customerUUID,
      password: encryptedPassword,
    });
    customerLogger.info(`New customer in postgresDB created: ${customer.UUID}`);

    const { password, ...data } = customer;

    const customerFirebase = await admin.auth().createUser({
      uid: customerUUID,
      email,
      password,
    });
    customerLogger.info(
      `New user at Firebase created: ${customerFirebase.uid}`
    );

    res.status(201).json({
      status: 'successful',
      msg: 'New customer in Postgres & Firebase created.',
      data,
    });
  } catch (error) {
    if (customer) {
      await Customer.query().deleteById(customer.UUID);
    }
    customerLogger.warn(`Error creating new merchant: ${error}`);
    next(error);
  }
};

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.query();
    customerLogger.info(
      `Successfully retrieved customers: ${customers.length} customers`
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
    customerLogger.info(
      `Successfully retrieved the customer: ${customer.UUID}`
    );

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
    customerLogger.info(`Successfully deleted customer <${uuid}> at Postgres `);

    await admin.auth().deleteUser(uuid);
    customerLogger.info(`Successfully deleted customer <${uuid}> at Firebase `);

    res.json({ message: `Successfully deleted customer <${uuid}>` });
  } catch (err) {
    customerLogger.warn(`Error deleting customer`);
    next(err);
  }
};
