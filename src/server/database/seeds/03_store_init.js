const { v4: uuidv4 } = require('uuid');

exports.seed = async (knex) => {
  try {
    await knex('store').del();
    await knex('store').insert([
      {
        uuid: uuidv4(),
        store_name: '99 Speedmart',
        store_address:
          '99 Speedmart, Jalan Pangkor, Kuala Lumpur, 50400, Malaysia',
        store_url: 'speedmart-jalan-pangkor',
        store_coordinate: {
          longitude: 101.69706006628358,
          latitude: 3.171695527194855,
        },
      },
      {
        uuid: uuidv4(),
        store_name: 'Minigood',
        store_address: 'Minigood, Pandan, Kuala Lumpur 55100, Malaysia',
        store_url: 'minigood-pandan',
        store_coordinate: {
          longitude: 101.71010412102106,
          latitude: 3.1455911962648453,
        },
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
