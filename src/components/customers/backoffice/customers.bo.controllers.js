const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const Customer = require('../customers.model');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.query();
    res.json(customers);
  } catch (err) {
    res.json(err);
  }
};

exports.register = async (req, res) => {
  try {
    const { password } = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const customer = await Customer.query().insert({
      ...req.body,
      UUID: uuidv4(),
      password: encryptedPassword,
    });
    res.json(customer);
  } catch (err) {
    res.json(err);
  }
};
