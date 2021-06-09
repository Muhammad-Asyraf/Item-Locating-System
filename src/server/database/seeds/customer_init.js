const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

exports.seed = async (knex) => {
  await knex('customer').del();
  await knex('customer').insert([
    {
      UUID: uuidv4(),
      username: 'asyraf131',
      email: 'asyraf.rmc@gmail.com',
      password: await bcrypt.hash('password123', 10),
    },
    {
      UUID: uuidv4(),
      username: 'danish131',
      email: 'danish@gmail.com',
      password: await bcrypt.hash('password123', 10),
    },
  ]);
};
