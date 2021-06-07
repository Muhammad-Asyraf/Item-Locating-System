const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const admin = require('../../../firebase');
const Merchant = require('../model');
const getLogger = require('../../../utils/logger');

const authLogger = getLogger(__filename, 'auth');

exports.signup = async (req, res, next) => {
  let merchant;
  const merchantUUID = uuidv4();
  const { password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    merchant = await Merchant.query().insert({
      ...req.body,
      UUID: merchantUUID,
      password: encryptedPassword,
    });
    authLogger.info(`New merchant in postgresDB created: ${merchant.UUID}`);

    const merchantFirebase = await admin.auth().createUser({
      uid: merchantUUID,
      ...req.body,
    });
    authLogger.info(`New user at Firebase created: ${merchantFirebase.uid}`);

    res.status(201).json({ status: 'ok' });
  } catch (error) {
    if (merchant) {
      await Merchant.query().deleteById(merchant.UUID);
    }
    authLogger.warn(`Error creating new merchant: ${error}`);
    next(error);
  }
};
