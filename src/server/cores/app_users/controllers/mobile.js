const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const admin = require('../../../firebase');
const AppUser = require('../model');
const getLogger = require('../../../utils/logger');

const appUserLogger = getLogger(__filename, 'auth');

exports.signup = async (req, res, next) => {
  let appUser;
  const appUserUUID = uuidv4();
  const { email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    appUser = await AppUser.query().insert({
      ...req.body,
      uuid: appUserUUID,
      password: encryptedPassword,
    });
    appUserLogger.info(`New appUser in postgresDB created: ${appUser.uuid}`);

    const { password: psw, ...data } = appUser;

    const appUserFirebase = await admin.auth().createUser({
      uid: appUserUUID,
      email,
      password,
    });
    appUserLogger.info(`New user at Firebase created: ${appUserFirebase.uid}`);

    res.status(201).json({
      status: 'successful',
      msg: 'New appUser in Postgres & Firebase created.',
      data,
    });
  } catch (error) {
    if (appUser) {
      await appUser.query().deleteById(appUser.UUID);
    }
    appUserLogger.warn(`Error creating new merchant: ${error}`);
    next(error);
  }
};

exports.getAllAppUsers = async (req, res, next) => {
  try {
    const appUsers = await AppUser.query();
    appUserLogger.info(
      `Successfully retrieved appUsers: ${appUsers.length} appUsers`
    );

    res.json(appUsers);
  } catch (err) {
    appUserLogger.warn(`Error retrieving all appUsers`);
    next(err);
  }
};

exports.findAppUser = async (req, res, next) => {
  try {
    const { uuid } = req.params;

    const appUser = await AppUser.query().findById(uuid);
    appUserLogger.info(`Successfully retrieved the appUser: ${appUser.uuid}`);

    res.json(appUser);
  } catch (err) {
    appUserLogger.warn(`Error retrieving appUser`);
    next(err);
  }
};

exports.removeAppUser = async (req, res, next) => {
  try {
    const { uuid } = req.params;

    await AppUser.query().deleteById(uuid);
    appUserLogger.info(`Successfully deleted appUser <${uuid}> at Postgres `);

    await admin.auth().deleteUser(uuid);
    appUserLogger.info(`Successfully deleted appUser <${uuid}> at Firebase `);

    res.json({ message: `Successfully deleted appUser <${uuid}>` });
  } catch (err) {
    appUserLogger.warn(`Error deleting appUser`);
    next(err);
  }
};
