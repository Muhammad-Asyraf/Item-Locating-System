const { v4: uuidv4 } = require('uuid');
const admin = require('../../firebase');
const bcrypt = require('bcrypt');

const deleteTestFirebaseUser = async (email) => {
  try {
    const firebase_test_user_one = await admin.auth().getUserByEmail(email);

    if (firebase_test_user_one) {
      await admin.auth().deleteUser(firebase_test_user_one.uid);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.seed = async (knex) => {
  try {
    const test_user_one_uuid = uuidv4();
    const test_user_one_first_name = 'Muhammad Farhan';
    const test_user_one_last_name = 'Bin Rahmad Ramadhan';
    const test_user_one_email = 'tester1@gmail.com';
    const test_user_one_phone_number = '0194445683';

    const test_user_two_uuid = uuidv4();
    const test_user_two_first_name = 'Wan Muhd Farid';
    const test_user_two_last_name = 'Bin Wan Azmi';
    const test_user_two_email = 'tester2@gmail.com';
    const test_user_two_phone_number = '0129584021';

    const password = 'loketla@fsktm';
    const encrypted_password = await bcrypt.hash(password, 10);

    await deleteTestFirebaseUser(test_user_one_email);
    await deleteTestFirebaseUser(test_user_two_email);
    await knex('backoffice_user').del();

    const speedmart_uuid = await knex
      .from('store')
      .where({
        store_url: 'speedmart-jalan-pangkor',
      })
      .select('uuid');

    const minigood_uuid = await knex
      .from('store')
      .where({
        store_url: 'minigood-pandan',
      })
      .select('uuid');

    await knex('backoffice_user').insert({
      uuid: test_user_one_uuid,
      first_name: test_user_one_first_name,
      last_name: test_user_one_last_name,
      email: test_user_one_email,
      password: encrypted_password,
      phone_number: test_user_one_phone_number,
      store_uuid: speedmart_uuid[0].uuid,
    });

    await knex('backoffice_user').insert({
      uuid: test_user_two_uuid,
      first_name: test_user_two_first_name,
      last_name: test_user_two_last_name,
      email: test_user_two_email,
      password: encrypted_password,
      phone_number: test_user_two_phone_number,
      store_uuid: minigood_uuid[0].uuid,
    });

    await admin.auth().createUser({
      uid: test_user_one_uuid,
      email: test_user_one_email,
      password,
    });

    await admin.auth().createUser({
      uid: test_user_two_uuid,
      email: test_user_two_email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};
