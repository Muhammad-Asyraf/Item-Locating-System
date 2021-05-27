const admin = require('firebase-admin');
const firebase = require('firebase');

const serviceAccount = require('./service_acount_key.json');
const firebaseConfig = require('./config');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://loketla.firebaseio.com',
});
firebase.initializeApp(firebaseConfig);

module.exports = { admin, firebase };
