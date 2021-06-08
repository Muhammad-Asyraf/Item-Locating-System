const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const admin = require('../../../firebase');
const Merchant = require('../model');
const getLogger = require('../../../utils/logger');

const merchantLogger = getLogger(__filename, 'merchant');

exports.signup = async (req, res, next) => {
  let merchant;
  const merchantUUID = uuidv4();
  const { fullName, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    merchant = await Merchant.query().insert({
      UUID: merchantUUID,
      full_name: fullName,
      email,
      password: encryptedPassword,
    });
    merchantLogger.info(`New merchant in postgresDB created: ${merchant.UUID}`);

    const merchantFirebase = await admin.auth().createUser({
      uid: merchantUUID,
      email,
      password,
    });
    merchantLogger.info(
      `New user at Firebase created: ${merchantFirebase.uid}`
    );

    res.status(201).json({ status: 'ok' });
  } catch (error) {
    if (merchant) {
      await Merchant.query().deleteById(merchant.UUID);
    }
    merchantLogger.warn(`Error creating new merchant: ${error}`);
    next(error);
  }
};
