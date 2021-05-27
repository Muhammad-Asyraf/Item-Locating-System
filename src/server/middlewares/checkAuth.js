const { admin } = require('../firebase/auth');
const getLogger = require('../utils/logger');

const authLogger = getLogger(__dirname, 'auth');

module.exports = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    const authtoken = req.headers.authorization.split('Bearer ')[1];
    try {
      const currentUser = await admin.auth().verifyIdToken(authtoken);
      authLogger.info(
        `Token verified! User [${currentUser.uid}] authenticated!`
      );
      next();
    } catch (error) {
      authLogger.warn('Token is not verified! Unauthorized access');
      res.status(403).json({ error: 'Unauthorized access' });
    }
  } else {
    authLogger.warn('No token, unauthorized access');
    res.status(403).json({ error: 'Unauthorized access' });
  }
};
