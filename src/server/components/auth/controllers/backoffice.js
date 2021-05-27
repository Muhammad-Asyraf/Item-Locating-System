const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { admin, firebase } = require('../../../firebase/init');
const Merchant = require('../../merchants/model');
const getLogger = require('../../../utils/logger');

const authLogger = getLogger(__filename, 'auth');

exports.registration = async (req, res, next) => {
  try {
    const merchant_uuid = uuidv4();
    const { email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const merchant = await Merchant.query().insert({
      ...req.body,
      UUID: merchant_uuid,
      password: encryptedPassword,
    });
    authLogger.info(`New merchant in postgresDB created: ${merchant.UUID}`);

    const merchantFirebase = await admin.auth().createUser({
      uid: merchant_uuid,
      ...req.body,
    });
    authLogger.info(`New user at Firebase created: ${merchantFirebase.uid}`);

    userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    authLogger.info(`Merchant signed in: ${userCredential.user.uid}`);

    token = await userCredential.user.getIdToken();
    authLogger.info(`JWT: ${token}`);

    res.status(201).json({ token });
  } catch (error) {
    authLogger.warn(`Error creating new merchant: ${error}`);
    res.json(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    authLogger.info(`Merchant signed in: ${userCredential.user.uid}`);

    token = await userCredential.user.getIdToken();
    authLogger.info(`JWT: ${token}`);

    res.status(201).json({ token });
  } catch (error) {
    authLogger.warn(`Error while login: ${error}`);
    res.json(error);
  }
};
