const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const admin = require('../../../firebase');
const BackofficeUser = require('../model');
const getLogger = require('../../../utils/logger');

const backofficeUserLogger = getLogger(__filename, 'backofficeUser');

exports.signup = async (req, res, next) => {
  let backofficeUser;
  const backofficeUserUUID = uuidv4();
  const { email, password, last_name } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const backofficeUser = await BackofficeUser.query()
      .insertGraph(
        {
          ...req.body,
          uuid: backofficeUserUUID,
          password: encryptedPassword,
        },
        { relate: true }
      )
      .returning();

    backofficeUserLogger.info(
      `New backofficeUser in postgresDB created: ${backofficeUser.uuid}`
    );

    const backofficeUserFirebase = await admin.auth().createUser({
      uid: backofficeUserUUID,
      displayName: last_name,
      email,
      password,
    });
    backofficeUserLogger.info(
      `New user at Firebase created: ${backofficeUserFirebase.uid}`
    );

    res.status(201).json({
      status: 'successful',
      msg: 'New backoffice user in Postgres & Firebase created.',
      user: backofficeUser,
    });
  } catch (error) {
    if (backofficeUser) {
      await BackofficeUser.query().deleteById(backofficeUser.uuid);
    }
    backofficeUserLogger.warn(`Error creating new backofficeUser: ${error}`);
    next(error);
  }
};

exports.findBackofficeUser = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const backofficeUser = await BackofficeUser.query().findById(uuid);

    backofficeUserLogger.info(
      `Successfully retrieved the backoffice user: ${backofficeUser.uuid}`
    );
    res.json(backofficeUser);
  } catch (err) {
    backofficeUserLogger.warn(`Error retrieving backoffice user`);
    next(err);
  }
};

exports.findBackofficeUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const backofficeUser = await BackofficeUser.query().where('email', email);

    if (backofficeUser.length > 0) {
      backofficeUserLogger.info(
        `Backoffice user found: ${backofficeUser[0].uuid}`
      );
    } else {
      backofficeUserLogger.info(`No Backoffice user was found`);
    }

    res.json(backofficeUser);
  } catch (err) {
    backofficeUserLogger.warn(`Error retrieving backoffice user`);
    next(err);
  }
};

exports.updateBackofficeUser = async (req, res, next) => {
  let backofficeUser;

  try {
    const { uuid } = req.params;
    const {
      first_name,
      last_name,
      email,
      phone_number,
      changePasswordRequest,
      currentPassword,
      newPassword,
    } = req.body;
    const encryptedNewPassword = await bcrypt.hash(newPassword, 10);

    const { password: userPassword } = await BackofficeUser.query()
      .select('password')
      .findById(uuid);

    const match = await bcrypt.compare(currentPassword, userPassword);

    if (!match) {
      throw {
        name: 'ValidationError',
        message: changePasswordRequest
          ? 'Incorrect current password!'
          : 'Incorrect password',
      };
    }

    backofficeUser = await BackofficeUser.query().patchAndFetchById(uuid, {
      first_name,
      last_name,
      email,
      phone_number,
      ...(changePasswordRequest && { password: encryptedNewPassword }),
    });
    backofficeUserLogger.info(
      `Backoffice user successfully updated: ${backofficeUser.uuid}`
    );

    const backofficeUserFirebase = await admin.auth().updateUser(uuid, {
      displayName: last_name,
      email,
      ...(changePasswordRequest && { password: newPassword }),
    });
    backofficeUserLogger.info(
      `Firebase user successfully updated: ${backofficeUserFirebase.uid}`
    );

    res.json(backofficeUserFirebase);
  } catch (err) {
    if (backofficeUser) {
      await BackofficeUser.query().deleteById(backofficeUser.uuid);
    }

    backofficeUserLogger.warn(`Error updating backoffice user`);
    next(err);
  }
};
