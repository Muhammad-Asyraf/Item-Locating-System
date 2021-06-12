const { v4: uuidv4 } = require('uuid');

exports.seed = async (knex) => {
  await knex('item').del();
  await knex('item').insert([
    {
      uuid: uuidv4(),
      name: 'FARM HOUSE Low Fat Milk High Calcium',
      barcode_number: 93857381938491,
      quantity: 200,
      descriptions:
        'Low Fat Milk That Is High Calcium And 100% Australian Milk',
      wholesale_price: 4.5,
    },
    {
      uuid: uuidv4(),
      name: 'Toothbrush',
      barcode_number: 85748383929304,
      quantity: 400,
      descriptions: 'Colgate Toothbursh',
      wholesale_price: 8.6,
    },
    {
      uuid: uuidv4(),
      name: 'DCC Luxury Clotted Cream',
      barcode_number: 90837465829386,
      quantity: 800,
      descriptions: 'Clotted Bottled Cream',
      wholesale_price: 18.9,
    },
    {
      uuid: uuidv4(),
      name: 'Lescure Whipping Cream',
      barcode_number: 56273816498723,
      quantity: 540,
      descriptions: 'Whipping Cream',
      wholesale_price: 15.8,
    },
  ]);
};
