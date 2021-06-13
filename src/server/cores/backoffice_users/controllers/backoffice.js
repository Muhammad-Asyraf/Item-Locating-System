const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const admin = require('../../../firebase');
const BackofficeUser = require('../model');
const getLogger = require('../../../utils/logger');

const backofficeUserLogger = getLogger(__filename, 'backofficeUser');

exports.signup = async (req, res, next) => {
  let backofficeUser;
  const backofficeUserUUID = uuidv4();
  const { fullName, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    backofficeUser = await BackofficeUser.query().insert({
      uuid: backofficeUserUUID,
      full_name: fullName,
      email,
      password: encryptedPassword,
    });
    backofficeUserLogger.info(
      `New backofficeUser in postgresDB created: ${backofficeUser.uuid}`
    );

    const backofficeUserFirebase = await admin.auth().createUser({
      uid: backofficeUserUUID,
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
