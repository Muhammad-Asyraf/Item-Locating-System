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

    const appUserFirebase = await admin.auth().createUser({
      uid: appUserUUID,
      email,
      password,
    });
    appUserLogger.info(`New user at Firebase created: ${appUserFirebase.uid}`);

    res.status(201).json({
      status: 'successful',
      msg: 'New appUser in Postgres & Firebase created.',
      user: appUser,
    });
  } catch (error) {
    if (appUser) {
      await AppUser.query().deleteById(appUser.uuid);
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

exports.findAppUserByUuid = async (req, res, next) => {
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

exports.findAppUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    const appUser = await AppUser.query().where({
      email,
    });
    appUserLogger.info(
      `Successfully retrieved the appUser: ${appUser[0].email}`
    );

    res.json(appUser[0]);
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

exports.updateUser = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    if (req.body.password != null) {
      delete req.body.password;
    }
    const appUser = await AppUser.query().patchAndFetchById(uuid, req.body);
    appUserLogger.info(`Successfully updated appUser <${uuid}> at Postgres `);

    // return userObject
    res.json(appUser);
  } catch (err) {
    appUserLogger.warn(`Error updating appUser`);
    next(err);
  }
};

exports.updateUserPassword = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    console.log(req.body);
    const { oldPassword, newPassword } = req.body;

    let appUser = await AppUser.query().findById(uuid).select('password');

    const passwordCheck = await bcrypt.compare(oldPassword, appUser.password);
    console.log(`Password same: ${passwordCheck}`);
    if (!passwordCheck) {
      res.json(
        "[password-incorrect] Old password does not match user's current password"
      );
    } else {
      const appUserFirebase = await admin
        .auth()
        .updateUser(uuid, { password: newPassword });
      appUserLogger.info(
        `Successfully updated appUser password <${uuid}> at Firebase `
      );

      const encryptedPassword = await bcrypt.hash(newPassword, 10);
      appUser = await AppUser.query().patchAndFetchById(uuid, {
        password: encryptedPassword,
      });
      appUserLogger.info(
        `Successfully updated appUser password <${uuid}> at Postgres `
      );

      // return userObject
      res.json(appUser);
    }
  } catch (err) {
    appUserLogger.warn(`Error updating appUser password`);
    next(err);
  }
};

exports.updateUserEmail = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    let emailObject = req.body;

    const appUserFirebase = await admin
      .auth()
      .updateUser(uuid, { email: emailObject.new });
    appUserLogger.info(
      `Successfully updated email for user <${uuid}> at Firebase `
    );
    const appUser = await AppUser.query().patchAndFetchById(uuid, {
      email: emailObject.new,
    });
    appUserLogger.info(
      `Successfully updated email for user <${uuid}> at Postgres `
    );

    // return userObject
    res.json(appUser);
  } catch (err) {
    appUserLogger.warn(`Error updating app user's email`);
    next(err);
  }
};
