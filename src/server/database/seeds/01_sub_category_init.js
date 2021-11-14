const { v4: uuidv4 } = require('uuid');

exports.seed = async (knex) => {
  await knex('sub_category').del();

  ///////////////////// Fresh Produce /////////////////////
  try {
    const fresh_produce_uuid = await knex
      .from('category')
      .where({
        name: 'Fresh Produce',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: fresh_produce_uuid[0].uuid,
        name: 'Fruits',
      },
      {
        uuid: uuidv4(),
        category_uuid: fresh_produce_uuid[0].uuid,
        name: 'Vegetables',
      },
      {
        uuid: uuidv4(),
        category_uuid: fresh_produce_uuid[0].uuid,
        name: 'Herbs, Spices & Tofu',
      },
      {
        uuid: uuidv4(),
        category_uuid: fresh_produce_uuid[0].uuid,
        name: 'Fresh Produce - Others',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Pantry & Ingredients /////////////////////
  try {
    const pantry_ingredients_uuid = await knex
      .from('category')
      .where({
        name: 'Pantry & Ingredients',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Spreads',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Sauces & Condiments',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Sweetener & Honey',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Spices & Seasonings',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Oil & Vinegar',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Marinades & Meat Preparation',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Preserved Dips & Spreads',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Baking & Flour',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Baking Supplies & Decor',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Pantry - Others',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Plant Based Sweeteners',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Canned & Dried Food',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Dried Herbs, Spices & Mixes',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Noodles & Pasta',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Rice & Grains',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Instant Noodles, Porridge & Pasta',
      },
      {
        uuid: uuidv4(),
        category_uuid: pantry_ingredients_uuid[0].uuid,
        name: 'Coconut & Condensed Milk',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Dairy & Eggs /////////////////////
  try {
    const dairy_eggs_uuid = await knex
      .from('category')
      .where({
        name: 'Dairy & Eggs',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: dairy_eggs_uuid[0].uuid,
        name: 'Milk',
      },
      {
        uuid: uuidv4(),
        category_uuid: dairy_eggs_uuid[0].uuid,
        name: 'Cream',
      },
      {
        uuid: uuidv4(),
        category_uuid: dairy_eggs_uuid[0].uuid,
        name: 'Cheese',
      },
      {
        uuid: uuidv4(),
        category_uuid: dairy_eggs_uuid[0].uuid,
        name: 'Eggs',
      },
      {
        uuid: uuidv4(),
        category_uuid: dairy_eggs_uuid[0].uuid,
        name: 'Yogurt',
      },
      {
        uuid: uuidv4(),
        category_uuid: dairy_eggs_uuid[0].uuid,
        name: 'Butter',
      },
      {
        uuid: uuidv4(),
        category_uuid: dairy_eggs_uuid[0].uuid,
        name: 'Milk Altenatives',
      },
      {
        uuid: uuidv4(),
        category_uuid: dairy_eggs_uuid[0].uuid,
        name: 'Non-Dairy',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Household /////////////////////
  try {
    const household_uuid = await knex
      .from('category')
      .where({
        name: 'Household',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: household_uuid[0].uuid,
        name: 'Laundry',
      },
      {
        uuid: uuidv4(),
        category_uuid: household_uuid[0].uuid,
        name: 'Home Improvement',
      },
      {
        uuid: uuidv4(),
        category_uuid: household_uuid[0].uuid,
        name: 'Home Cleaning',
      },
      {
        uuid: uuidv4(),
        category_uuid: household_uuid[0].uuid,
        name: 'Tissue & Paper Products',
      },
      {
        uuid: uuidv4(),
        category_uuid: household_uuid[0].uuid,
        name: 'Air Freshener',
      },
      {
        uuid: uuidv4(),
        category_uuid: household_uuid[0].uuid,
        name: 'Insect & Rodent Control',
      },
      {
        uuid: uuidv4(),
        category_uuid: household_uuid[0].uuid,
        name: 'Foils & Bags',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Pets /////////////////////
  try {
    const pets_uuid = await knex
      .from('category')
      .where({
        name: 'Pets',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: pets_uuid[0].uuid,
        name: 'Cats & Kittens',
      },
      {
        uuid: uuidv4(),
        category_uuid: pets_uuid[0].uuid,
        name: 'Dogs & Puppies',
      },
      {
        uuid: uuidv4(),
        category_uuid: pets_uuid[0].uuid,
        name: 'Others',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Dry & Canned Goods /////////////////////
  try {
    const dry_canned_goods_uuid = await knex
      .from('category')
      .where({
        name: 'Dry & Canned Goods',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: dry_canned_goods_uuid[0].uuid,
        name: 'Canned & Jarred Vegetables',
      },
      {
        uuid: uuidv4(),
        category_uuid: dry_canned_goods_uuid[0].uuid,
        name: 'Soup, Broth & Bouillon',
      },
      {
        uuid: uuidv4(),
        category_uuid: dry_canned_goods_uuid[0].uuid,
        name: 'Instant Foods',
      },
      {
        uuid: uuidv4(),
        category_uuid: dry_canned_goods_uuid[0].uuid,
        name: 'Grains, Rice & Dried Goods',
      },
      {
        uuid: uuidv4(),
        category_uuid: dry_canned_goods_uuid[0].uuid,
        name: 'Cereal & Granola',
      },
      {
        uuid: uuidv4(),
        category_uuid: dry_canned_goods_uuid[0].uuid,
        name: 'Dry & Canned Goods - Others',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Snacks /////////////////////
  try {
    const snacks_uuid = await knex
      .from('category')
      .where({
        name: 'Snacks',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: snacks_uuid[0].uuid,
        name: 'Chocolates & Candies',
      },
      {
        uuid: uuidv4(),
        category_uuid: snacks_uuid[0].uuid,
        name: 'Chips, Crackers & Pretzels',
      },
      {
        uuid: uuidv4(),
        category_uuid: snacks_uuid[0].uuid,
        name: 'Crackers',
      },
      {
        uuid: uuidv4(),
        category_uuid: snacks_uuid[0].uuid,
        name: 'Cereal & Energy Bars',
      },
      {
        uuid: uuidv4(),
        category_uuid: snacks_uuid[0].uuid,
        name: 'Nuts, Seeds & Dried Snacks',
      },
      {
        uuid: uuidv4(),
        category_uuid: snacks_uuid[0].uuid,
        name: 'Mint & Gum',
      },
      {
        uuid: uuidv4(),
        category_uuid: snacks_uuid[0].uuid,
        name: 'Puddings & Jellies',
      },
      {
        uuid: uuidv4(),
        category_uuid: snacks_uuid[0].uuid,
        name: 'Biscuits & Cookies',
      },
      {
        uuid: uuidv4(),
        category_uuid: snacks_uuid[0].uuid,
        name: 'Dried Fruits & Nuts',
      },
      {
        uuid: uuidv4(),
        category_uuid: snacks_uuid[0].uuid,
        name: 'Gluten-Free',
      },
      {
        uuid: uuidv4(),
        category_uuid: snacks_uuid[0].uuid,
        name: 'Cakes',
      },
      {
        uuid: uuidv4(),
        category_uuid: snacks_uuid[0].uuid,
        name: 'Snack - Others',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Personal Care & Health /////////////////////
  try {
    const personal_care_health_uuid = await knex
      .from('category')
      .where({
        name: 'Personal Care & Health',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: personal_care_health_uuid[0].uuid,
        name: 'Face & Makeup',
      },
      {
        uuid: uuidv4(),
        category_uuid: personal_care_health_uuid[0].uuid,
        name: 'Hair Care',
      },
      {
        uuid: uuidv4(),
        category_uuid: personal_care_health_uuid[0].uuid,
        name: 'Bath & Body',
      },
      {
        uuid: uuidv4(),
        category_uuid: personal_care_health_uuid[0].uuid,
        name: 'Oral Care',
      },
      {
        uuid: uuidv4(),
        category_uuid: personal_care_health_uuid[0].uuid,
        name: 'Feminine Care',
      },
      {
        uuid: uuidv4(),
        category_uuid: personal_care_health_uuid[0].uuid,
        name: 'Men Care',
      },
      {
        uuid: uuidv4(),
        category_uuid: personal_care_health_uuid[0].uuid,
        name: 'Adult Diapers',
      },
      {
        uuid: uuidv4(),
        category_uuid: personal_care_health_uuid[0].uuid,
        name: 'First Aid & Medicine',
      },
      {
        uuid: uuidv4(),
        category_uuid: personal_care_health_uuid[0].uuid,
        name: 'Vitamins & Supplements',
      },
      {
        uuid: uuidv4(),
        category_uuid: personal_care_health_uuid[0].uuid,
        name: 'Sexual Wellness',
      },
      {
        uuid: uuidv4(),
        category_uuid: personal_care_health_uuid[0].uuid,
        name: 'Herbal Medicine & Supplements',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Drinks, Coffee & Tea /////////////////////
  try {
    const drinks_coffee_tea_uuid = await knex
      .from('category')
      .where({
        name: 'Drinks, Coffee & Tea',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: drinks_coffee_tea_uuid[0].uuid,
        name: 'Tea',
      },
      {
        uuid: uuidv4(),
        category_uuid: drinks_coffee_tea_uuid[0].uuid,
        name: 'Juices & Health Drinks',
      },
      {
        uuid: uuidv4(),
        category_uuid: drinks_coffee_tea_uuid[0].uuid,
        name: 'Water',
      },
      {
        uuid: uuidv4(),
        category_uuid: drinks_coffee_tea_uuid[0].uuid,
        name: 'Coffee',
      },
      {
        uuid: uuidv4(),
        category_uuid: drinks_coffee_tea_uuid[0].uuid,
        name: 'Soft Drinks & Syrups',
      },
      {
        uuid: uuidv4(),
        category_uuid: drinks_coffee_tea_uuid[0].uuid,
        name: 'Chocolate & Malt Drinks',
      },
      {
        uuid: uuidv4(),
        category_uuid: drinks_coffee_tea_uuid[0].uuid,
        name: 'Sport & Energy Drinks',
      },
      {
        uuid: uuidv4(),
        category_uuid: drinks_coffee_tea_uuid[0].uuid,
        name: 'Beverages - Others',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Meat & Seafood /////////////////////
  try {
    const meat_seafood_uuid = await knex
      .from('category')
      .where({
        name: 'Meat & Seafood',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: meat_seafood_uuid[0].uuid,
        name: 'Fresh Meat',
      },
      {
        uuid: uuidv4(),
        category_uuid: meat_seafood_uuid[0].uuid,
        name: 'Fresh Seafood',
      },
      {
        uuid: uuidv4(),
        category_uuid: meat_seafood_uuid[0].uuid,
        name: 'Frozen Seafood',
      },
      {
        uuid: uuidv4(),
        category_uuid: meat_seafood_uuid[0].uuid,
        name: 'Frozen Meat & Chicken',
      },
      {
        uuid: uuidv4(),
        category_uuid: meat_seafood_uuid[0].uuid,
        name: 'Canned Meat & Chicken',
      },
      {
        uuid: uuidv4(),
        category_uuid: meat_seafood_uuid[0].uuid,
        name: 'Canned Meat & Seafood',
      },
      {
        uuid: uuidv4(),
        category_uuid: meat_seafood_uuid[0].uuid,
        name: 'Cold Cuts',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Chilled & Frozen /////////////////////
  try {
    const chilled_frozen_uuid = await knex
      .from('category')
      .where({
        name: 'Chilled & Frozen',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: chilled_frozen_uuid[0].uuid,
        name: 'Frozen Appetizers & Sides',
      },
      {
        uuid: uuidv4(),
        category_uuid: chilled_frozen_uuid[0].uuid,
        name: 'Frozen Dessert',
      },
      {
        uuid: uuidv4(),
        category_uuid: chilled_frozen_uuid[0].uuid,
        name: 'Ice Cream',
      },
      {
        uuid: uuidv4(),
        category_uuid: chilled_frozen_uuid[0].uuid,
        name: 'Ready-to-Eat Frozen Food',
      },
      {
        uuid: uuidv4(),
        category_uuid: chilled_frozen_uuid[0].uuid,
        name: 'Tofu & Tempeh',
      },
      {
        uuid: uuidv4(),
        category_uuid: chilled_frozen_uuid[0].uuid,
        name: 'Frozen Pizza, Pastry & Cake',
      },
      {
        uuid: uuidv4(),
        category_uuid: chilled_frozen_uuid[0].uuid,
        name: 'Frozen Fruits & Vegetables',
      },
      {
        uuid: uuidv4(),
        category_uuid: chilled_frozen_uuid[0].uuid,
        name: 'Fries & Asian Food',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Baby & Mom /////////////////////
  try {
    const baby_mom_uuid = await knex
      .from('category')
      .where({
        name: 'Baby & Mom',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: baby_mom_uuid[0].uuid,
        name: 'Hair & Body Care',
      },
      {
        uuid: uuidv4(),
        category_uuid: baby_mom_uuid[0].uuid,
        name: 'Baby Formula',
      },
      {
        uuid: uuidv4(),
        category_uuid: baby_mom_uuid[0].uuid,
        name: 'Diapers',
      },
      {
        uuid: uuidv4(),
        category_uuid: baby_mom_uuid[0].uuid,
        name: 'Baby Health Baby Accessories',
      },
      {
        uuid: uuidv4(),
        category_uuid: baby_mom_uuid[0].uuid,
        name: 'Baby Food',
      },
      {
        uuid: uuidv4(),
        category_uuid: baby_mom_uuid[0].uuid,
        name: 'Cleaning',
      },
      {
        uuid: uuidv4(),
        category_uuid: baby_mom_uuid[0].uuid,
        name: 'Wipes & Cottons',
      },
      {
        uuid: uuidv4(),
        category_uuid: baby_mom_uuid[0].uuid,
        name: 'For Mom',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Bakery & Breakfast /////////////////////
  try {
    const bakery_breakfast_uuid = await knex
      .from('category')
      .where({
        name: 'Bakery & Breakfast',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: bakery_breakfast_uuid[0].uuid,
        name: 'Bakery - Other',
      },
      {
        uuid: uuidv4(),
        category_uuid: bakery_breakfast_uuid[0].uuid,
        name: 'Croissant, Danish & Puffs',
      },
      {
        uuid: uuidv4(),
        category_uuid: bakery_breakfast_uuid[0].uuid,
        name: 'Jams, Spreads & Honey',
      },
      {
        uuid: uuidv4(),
        category_uuid: bakery_breakfast_uuid[0].uuid,
        name: 'Cereals & Energy Bars',
      },
      {
        uuid: uuidv4(),
        category_uuid: bakery_breakfast_uuid[0].uuid,
        name: 'Bakery',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Organic Products /////////////////////
  try {
    const organic_products_uuid = await knex
      .from('category')
      .where({
        name: 'Organic Products',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: organic_products_uuid[0].uuid,
        name: 'Organic Fresh Produce',
      },
      {
        uuid: uuidv4(),
        category_uuid: organic_products_uuid[0].uuid,
        name: 'Organic Dairy & Beverages',
      },
      {
        uuid: uuidv4(),
        category_uuid: organic_products_uuid[0].uuid,
        name: 'Organic Pantry Supplies',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Health & Wellness /////////////////////
  try {
    const health_wellness_uuid = await knex
      .from('category')
      .where({
        name: 'Health & Wellness',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: health_wellness_uuid[0].uuid,
        name: 'Health Supplements',
      },
      {
        uuid: uuidv4(),
        category_uuid: health_wellness_uuid[0].uuid,
        name: 'First Aid & Health Care',
      },
      {
        uuid: uuidv4(),
        category_uuid: health_wellness_uuid[0].uuid,
        name: 'Health & Wellness - Other',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Delicacy /////////////////////
  try {
    const delicacy_uuid = await knex
      .from('category')
      .where({
        name: 'Delicacy',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: delicacy_uuid[0].uuid,
        name: 'Specialty Cheeses',
      },
      {
        uuid: uuidv4(),
        category_uuid: delicacy_uuid[0].uuid,
        name: 'Fresh Dips & Tapenades',
      },
      {
        uuid: uuidv4(),
        category_uuid: delicacy_uuid[0].uuid,
        name: 'Tofu & Meat Alternatives',
      },
      {
        uuid: uuidv4(),
        category_uuid: delicacy_uuid[0].uuid,
        name: 'Deli - Other',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Flavours of The World /////////////////////
  try {
    const flavours_of_the_world_uuid = await knex
      .from('category')
      .where({
        name: 'Flavours of The World',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: flavours_of_the_world_uuid[0].uuid,
        name: 'Taste of Japan',
      },
      {
        uuid: uuidv4(),
        category_uuid: flavours_of_the_world_uuid[0].uuid,
        name: 'Taste of Korea',
      },
      {
        uuid: uuidv4(),
        category_uuid: flavours_of_the_world_uuid[0].uuid,
        name: 'Taste of Italy',
      },
      {
        uuid: uuidv4(),
        category_uuid: flavours_of_the_world_uuid[0].uuid,
        name: 'Taste of Middle East',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Festive /////////////////////
  try {
    const festive_uuid = await knex
      .from('category')
      .where({
        name: 'Festive',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: festive_uuid[0].uuid,
        name: 'Hamper & Gift Set',
      },
      {
        uuid: uuidv4(),
        category_uuid: festive_uuid[0].uuid,
        name: 'Ramadhan & Raya',
      },
      {
        uuid: uuidv4(),
        category_uuid: festive_uuid[0].uuid,
        name: 'Chinese New Year',
      },
      {
        uuid: uuidv4(),
        category_uuid: festive_uuid[0].uuid,
        name: 'Deepavali',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Beer, Wine & Liquor /////////////////////
  try {
    const beer_wine_liquor_uuid = await knex
      .from('category')
      .where({
        name: 'Beer, Wine & Liquor',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: beer_wine_liquor_uuid[0].uuid,
        name: 'Beers & Ciders',
      },
      {
        uuid: uuidv4(),
        category_uuid: beer_wine_liquor_uuid[0].uuid,
        name: 'Liquors &  Spirits',
      },
      {
        uuid: uuidv4(),
        category_uuid: beer_wine_liquor_uuid[0].uuid,
        name: 'Wines',
      },
      {
        uuid: uuidv4(),
        category_uuid: beer_wine_liquor_uuid[0].uuid,
        name: 'Alcohol-Free',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Non-Halal /////////////////////
  try {
    const non_halal_uuid = await knex
      .from('category')
      .where({
        name: 'Non-Halal',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: non_halal_uuid[0].uuid,
        name: 'Hot Dogs, Ham, Bacon & Sausage',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_halal_uuid[0].uuid,
        name: 'Instant Non-Halal & Canned Goods',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_halal_uuid[0].uuid,
        name: 'Sauces & Seasoning',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_halal_uuid[0].uuid,
        name: 'Snacks & Dessert',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_halal_uuid[0].uuid,
        name: 'Frozen & Packaged Pork',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Plant Based /////////////////////
  try {
    const plant_based_uuid = await knex
      .from('category')
      .where({
        name: 'Plant Based',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: plant_based_uuid[0].uuid,
        name: 'Milk & Eggs',
      },
      {
        uuid: uuidv4(),
        category_uuid: plant_based_uuid[0].uuid,
        name: 'Packaged Cheese',
      },
    ]);
  } catch (err) {
    console.log(err);
  }

  ///////////////////// Non-Food & Homeware /////////////////////
  try {
    const non_food_homeware_uuid = await knex
      .from('category')
      .where({
        name: 'Non-Food & Homeware',
      })
      .select('uuid');

    await knex('sub_category').insert([
      {
        uuid: uuidv4(),
        category_uuid: non_food_homeware_uuid[0].uuid,
        name: 'Batteries & Lighting',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_food_homeware_uuid[0].uuid,
        name: 'Kitchen & Tableware',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_food_homeware_uuid[0].uuid,
        name: 'Living & Sleeping',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_food_homeware_uuid[0].uuid,
        name: 'Lighters, Matches & Charcoal',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_food_homeware_uuid[0].uuid,
        name: 'Clothes',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_food_homeware_uuid[0].uuid,
        name: 'Stationery',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_food_homeware_uuid[0].uuid,
        name: 'Party & Occasions',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_food_homeware_uuid[0].uuid,
        name: 'Toys & Games',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_food_homeware_uuid[0].uuid,
        name: 'Automative Care',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_food_homeware_uuid[0].uuid,
        name: 'Electric Appliances',
      },
      {
        uuid: uuidv4(),
        category_uuid: non_food_homeware_uuid[0].uuid,
        name: 'Hardware & Tools',
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};
