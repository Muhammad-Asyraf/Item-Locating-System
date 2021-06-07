const admin = require('firebase-admin');
const serviceAccount = require('./service_acount_key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
