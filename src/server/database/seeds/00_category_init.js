const { v4: uuidv4 } = require('uuid');

exports.seed = async (knex) => {
  try {
    await knex('category').del();
    await knex('category').insert([
      {
        uuid: uuidv4(),
        name: 'Fresh Produce',
      },
      {
        uuid: uuidv4(),
        name: 'Pantry & Ingredients',
      },
      {
        uuid: uuidv4(),
        name: 'Dairy & Eggs',
      },
      {
        uuid: uuidv4(),
        name: 'Household',
      },
      {
        uuid: uuidv4(),
        name: 'Pets',
      },
      {
        uuid: uuidv4(),
        name: 'Dry & Canned Goods',
      },
      {
        uuid: uuidv4(),
        name: 'Snacks',
      },
      {
        uuid: uuidv4(),
        name: 'Personal Care & Health',
      },
      {
        uuid: uuidv4(),
        name: 'Drinks, Coffee & Tea',
      },
      {
        uuid: uuidv4(),
        name: 'Meat & Seafood',
      },
      {
        uuid: uuidv4(),
        name: 'Chilled & Frozen',
      },
      {
        uuid: uuidv4(),
        name: 'Baby & Mom',
      },
      {
        uuid: uuidv4(),
        name: 'Bakery & Breakfast',
      },
      {
        uuid: uuidv4(),
        name: 'Organic Products',
      },
      {
        uuid: uuidv4(),
        name: 'Health & Wellness',
      },
      {
        uuid: uuidv4(),
        name: 'Delicacy',
      },
      {
        uuid: uuidv4(),
        name: 'Flavours of The World',
      },
      {
        uuid: uuidv4(),
        name: 'Festive',
      },
      {
        uuid: uuidv4(),
        name: 'Beer, Wine & Liquor',
      },
      {
        uuid: uuidv4(),
        name: 'Non-Halal',
      },
      {
        uuid: uuidv4(),
        name: 'Plant Based',
      },
      {
        uuid: uuidv4(),
        name: 'Non-Food & Homeware',
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

// "Fresh Produce"
// "Pantry_Ingredients"
// "Dairy & Eggs"
// "Household"
// "Pets"
// "Dry & Canned Goods"
// "Snacks"
// "Personal Care & Health"
// "Drinks, Coffee & Tea"
// "Meat & Seafood"
// "Chilled & Frozen"
// "Baby & Mom"
// "Bakery & Breakfast"
// "Organic Products"
// "Health & Wellness"
// "Delicacy"
// "Flavours of The World"
// "Festive"
// "Beer, Wine & Liquor"
// "Non-Halal"
// "Plant Based "
// "Non-Food & Homeware"

// "Fruits"
// "Vegetables"
// "Herbs, Spices & Tofu"
// "Fresh Produce - Others"

// "Spreads"
// "Sauces & Condiments"
// "Sweetener & Honey"
// "Spices & Seasonings"
// "Oil & Vinegar"
// "Marinades & Meat Preparation"
// "Preserved Dips & Spreads"
// "Baking & Flour"
// "Baking Supplies & Decor"
// "Pantry - Other"
// "Plant Based Sweeteners"
// "Canned & Dried Food"
// "Dried Herbs, Spices & Mixes"
// "Noodles & Pasta"
// "Rice & Grains"
// "Instant Noodles, Porridge & Pasta"
// "Coconut & Condensed Milk"

// "Milk"
// "Cream"
// "Cheese"
// "Eggs"
// "Yogurt"
// "Butter"
// "Milk Alternatives"
// "Non-Dairy"

// "Laundry"
// "Home Improvement"
// "Home Cleaning"
// "Tissue & Paper Products"
// "Air Freshener"
// "Insect & Rodent Control"
// "Foils & Bags"

// "Cats & Kittens"
// "Dogs & Puppies"
// "Others"

// "Canned & Jarred Vegetables"
// "Soup, Broth & Bouillon"
// "Instant Foods"
// "Grains, Rice & Dried Goods"
// "Cereal & Granola"
// "Dry & Canned Goods - Others"

// "Chocolates & Candies"
// "Chips, Crackers & Pretzels"
// "Cakes"
// "Crackers"
// "Cereal & Energy Bars"
// "Nuts, Seeds & Dried Snacks"
// "Mint & Gum"
// "Puddings & Jellies "
// "Biscuits & Cookies"
// "Dried Fruits & Nuts"
// "Gluten-Free"
// "Snack - Others"

// "Face & Makeup"
// "Hair Care"
// "Bath & Body"
// "Oral Care"
// "Feminine Care"
// "Men Care"
// "Adult Diapers"
// "First Aid & Medicine"
// "Vitamins & Supplements"
// "Sexual Wellness"
// "Herbal Medicine & Supplements"

// "Tea"
// "Juices & Health Drinks"
// "Water"
// "Coffee"
// "Soft Drinks & Syrups"
// "Chocolate & Malt Drinks"
// "Sport & Energy Drinks"
// "Beverages - Others"

// "Fresh Meat "
// "Fresh Seafood"
// "Frozen Seafood"
// "Frozen Meat & Chicken"
// "Canned Meat & Chicken"
// "Canned Meat & Seafood"
// "Cold Cuts"

// "Frozen Appetizers & Sides"
// "Frozen Dessert"
// "Ice Cream"
// "Ready-to-Eat Frozen Food"
// "Tofu & Tempeh"
// "Frozen Pizza, Pastry & Cake"
// "Frozen Fruits & Vegetables"
// "Fries & Asian Food"

// "Hair & Body Care"
// "Baby Formula"
// "Diapers"
// "Baby Health Baby Accessories"
// "Baby Food"
// "Cleaning"
// "Wipes & Cottons"
// "For Mom"

// "Bakery - Other"
// "Croissant, Danish & Puffs"
// "Jams, Spreads & Honey"
// "Cereals & Energy Bars"
// "Bakery"

// "Organic Fresh Produce"
// "Organic Dairy & Beverages"
// "Organic Pantry Supplies"

// "Health Supplements"
// "First Aid & Health Care"
// "Health & Wellness - OtherFresh Produce"

// "Specialty Cheeses"
// "Fresh Dips & Tapenades"
// "Tofu & Meat Alternatives"
// "Deli - Other"

// "Taste of Japan"
// "Taste of Korea"
// "Taste of Italy"
// "Taste of Middle East"

// "Hamper & Gift Set"
// "Ramadhan & Raya"
// "Chinese New Year"
// "Deepavali"

// "Beers & Ciders"
// "Liquors &  Spirits"
// "Wines"
// "Alcohol-Free"

// "Hot Dogs, Ham, Bacon & Sausage"
// "Instant Non-Halal & Canned Goods"
// "Sauces & Seasoning"
// "Snacks & Dessert"
// "Frozen & Packaged Pork"

// "Milk & Eggs"
// "Packaged Cheese"

// "Batteries & Lighting"
// "Kitchen & Tableware"
// "Living & Sleeping"
// "Lighters, Matches & Charcoal"
// "Clothes"
// "Stationery"
// "Party & Occasions"
// "Toys & Games"
// "Automative Care"
// "Electric Appliances"
// "Hardware & Tools"

// const fresh_produce_uuid = uuidv4();
// const pantry_ingredients_uuid = uuidv4();
// const dairy_eggs_uuid = uuidv4();
// const household_uuid = uuidv4();
// const pets_uuid = uuidv4();
// const dry_canned_goods_uuid = uuidv4();
// const snacks_uuid = uuidv4();
// const personal_care_health_uuid = uuidv4();
// const drinks_coffee_tea_uuid = uuidv4();
// const meat_seafood_uuid = uuidv4();
// const chilled_frozen_uuid = uuidv4();
// const baby_mom_uuid = uuidv4();
// const bakery_breakfast_uuid = uuidv4();
// const organic_products_uuid = uuidv4();
// const health_wellness_uuid = uuidv4();
// const delicacy_uuid = uuidv4();
// const flavours_of_the_world_uuid = uuidv4();
// const festive_uuid = uuidv4();
// const beer_wine_liquor_uuid = uuidv4();
// const non_halal_uuid = uuidv4();
// const plant_based_uuid = uuidv4();
// const non_food_homeware_uuid = uuidv4();

// await knex('sub_category').insert([
//   {
//     uuid: uuidv4(),
//     category_uuid: fresh_produce_uuid,
//     name: 'Fruits',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: fresh_produce_uuid,
//     name: 'Vegetables',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: fresh_produce_uuid,
//     name: 'Herbs, Spices & Tofu',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: fresh_produce_uuid,
//     name: 'Fresh Produce - Others',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Spreads',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Sauces & Condiments',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Sweetener & Honey',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Spices & Seasonings',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Oil & Vinegar',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Marinades & Meat Preparation',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Preserved Dips & Spreads',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Baking & Flour',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Baking Supplies & Decor',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Pantry - Others',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Plant Based Sweeteners',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Canned & Dried Food',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Dried Herbs, Spices & Mixes',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Noodles & Pasta',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Rice & Grains',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Instant Noodles, Porridge & Pasta',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pantry_ingredients_uuid,
//     name: 'Coconut & Condensed Milk',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dairy_eggs_uuid,
//     name: 'Milk',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dairy_eggs_uuid,
//     name: 'Cream',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dairy_eggs_uuid,
//     name: 'Cheese',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dairy_eggs_uuid,
//     name: 'Eggs',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dairy_eggs_uuid,
//     name: 'Yogurt',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dairy_eggs_uuid,
//     name: 'Butter',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dairy_eggs_uuid,
//     name: 'Milk Altenatives',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dairy_eggs_uuid,
//     name: 'Non-Dairy',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: household_uuid,
//     name: 'Laundry',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: household_uuid,
//     name: 'Home Improvement',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: household_uuid,
//     name: 'Home Cleaning',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: household_uuid,
//     name: 'Tissue & Paper Products',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: household_uuid,
//     name: 'Air Freshener',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: household_uuid,
//     name: 'Insect & Rodent Control',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: household_uuid,
//     name: 'Foils & Bags',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pets_uuid,
//     name: 'Cats & Kittens',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pets_uuid,
//     name: 'Dogs & Puppies',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: pets_uuid,
//     name: 'Others',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dry_canned_goods_uuid,
//     name: 'Canned & Jarred Vegetables',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dry_canned_goods_uuid,
//     name: 'Soup, Broth & Bouillon',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dry_canned_goods_uuid,
//     name: 'Instant Foods',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dry_canned_goods_uuid,
//     name: 'Grains, Rice & Dried Goods',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dry_canned_goods_uuid,
//     name: 'Cereal & Granola',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: dry_canned_goods_uuid,
//     name: 'Dry & Canned Goods - Others',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: snacks_uuid,
//     name: 'Chocolates & Candies',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: snacks_uuid,
//     name: 'Chips, Crackers & Pretzels',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: snacks_uuid,
//     name: 'Crackers',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: snacks_uuid,
//     name: 'Cereal & Energy Bars',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: snacks_uuid,
//     name: 'Nuts, Seeds & Dried Snacks',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: snacks_uuid,
//     name: 'Mint & Gum',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: snacks_uuid,
//     name: 'Puddings & Jellies',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: snacks_uuid,
//     name: 'Biscuits & Cookies',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: snacks_uuid,
//     name: 'Dried Fruits & Nuts',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: snacks_uuid,
//     name: 'Gluten-Free',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: snacks_uuid,
//     name: 'Cakes',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: snacks_uuid,
//     name: 'Snack - Others',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: personal_care_health_uuid,
//     name: 'Face & Makeup',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: personal_care_health_uuid,
//     name: 'Hair Care',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: personal_care_health_uuid,
//     name: 'Bath & Body',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: personal_care_health_uuid,
//     name: 'Oral Care',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: personal_care_health_uuid,
//     name: 'Feminine Care',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: personal_care_health_uuid,
//     name: 'Men Care',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: personal_care_health_uuid,
//     name: 'Adult Diapers',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: personal_care_health_uuid,
//     name: 'First Aid & Medicine',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: personal_care_health_uuid,
//     name: 'Vitamins & Supplements',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: personal_care_health_uuid,
//     name: 'Sexual Wellness',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: personal_care_health_uuid,
//     name: 'Herbal Medicine & Supplements',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: drinks_coffee_tea_uuid,
//     name: 'Tea',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: drinks_coffee_tea_uuid,
//     name: 'Juices & Health Drinks',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: drinks_coffee_tea_uuid,
//     name: 'Water',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: drinks_coffee_tea_uuid,
//     name: 'Coffee',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: drinks_coffee_tea_uuid,
//     name: 'Soft Drinks & Syrups',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: drinks_coffee_tea_uuid,
//     name: 'Chocolate & Malt Drinks',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: drinks_coffee_tea_uuid,
//     name: 'Sport & Energy Drinks',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: drinks_coffee_tea_uuid,
//     name: 'Beverages - Others',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: meat_seafood_uuid,
//     name: 'Fresh Meat',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: meat_seafood_uuid,
//     name: 'Fresh Seafood',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: meat_seafood_uuid,
//     name: 'Frozen Seafood',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: meat_seafood_uuid,
//     name: 'Frozen Meat & Chicken',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: meat_seafood_uuid,
//     name: 'Canned Meat & Chicken',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: meat_seafood_uuid,
//     name: 'Canned Meat & Seafood',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: meat_seafood_uuid,
//     name: 'Cold Cuts',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: chilled_frozen_uuid,
//     name: 'Frozen Appetizers & Sides',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: chilled_frozen_uuid,
//     name: 'Frozen Dessert',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: chilled_frozen_uuid,
//     name: 'Ice Cream',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: chilled_frozen_uuid,
//     name: 'Ready-to-Eat Frozen Food',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: chilled_frozen_uuid,
//     name: 'Tofu & Tempeh',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: chilled_frozen_uuid,
//     name: 'Frozen Pizza, Pastry & Cake',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: chilled_frozen_uuid,
//     name: 'Frozen Fruits & Vegetables',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: chilled_frozen_uuid,
//     name: 'Fries & Asian Food',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: baby_mom_uuid,
//     name: 'Hair & Body Care',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: baby_mom_uuid,
//     name: 'Baby Formula',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: baby_mom_uuid,
//     name: 'Diapers',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: baby_mom_uuid,
//     name: 'Baby Health Baby Accessories',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: baby_mom_uuid,
//     name: 'Baby Food',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: baby_mom_uuid,
//     name: 'Cleaning',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: baby_mom_uuid,
//     name: 'Wipes & Cottons',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: baby_mom_uuid,
//     name: 'For Mom',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: bakery_breakfast_uuid,
//     name: 'Bakery - Other',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: bakery_breakfast_uuid,
//     name: 'Croissant, Danish & Puffs',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: bakery_breakfast_uuid,
//     name: 'Jams, Spreads & Honey',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: bakery_breakfast_uuid,
//     name: 'Cereals & Energy Bars',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: bakery_breakfast_uuid,
//     name: 'Bakery',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: organic_products_uuid,
//     name: 'Organic Fresh Produce',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: organic_products_uuid,
//     name: 'Organic Dairy & Beverages',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: organic_products_uuid,
//     name: 'Organic Pantry Supplies',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: health_wellness_uuid,
//     name: 'Health Supplements',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: health_wellness_uuid,
//     name: 'First Aid & Health Care',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: health_wellness_uuid,
//     name: 'Health & Wellness - Other',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: delicacy_uuid,
//     name: 'Specialty Cheeses',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: delicacy_uuid,
//     name: 'Fresh Dips & Tapenades',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: delicacy_uuid,
//     name: 'Tofu & Meat Alternatives',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: delicacy_uuid,
//     name: 'Deli - Other',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: flavours_of_the_world_uuid,
//     name: 'Taste of Japan',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: flavours_of_the_world_uuid,
//     name: 'Taste of Korea',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: flavours_of_the_world_uuid,
//     name: 'Taste of Italy',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: flavours_of_the_world_uuid,
//     name: 'Taste of Middle East',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: festive_uuid,
//     name: 'Hamper & Gift Set',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: festive_uuid,
//     name: 'Ramadhan & Raya',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: festive_uuid,
//     name: 'Chinese New Year',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: festive_uuid,
//     name: 'Deepavali',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: beer_wine_liquor_uuid,
//     name: 'Beers & Ciders',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: beer_wine_liquor_uuid,
//     name: 'Liquors &  Spirits',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: beer_wine_liquor_uuid,
//     name: 'Wines',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: beer_wine_liquor_uuid,
//     name: 'Alcohol-Free',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_halal_uuid,
//     name: 'Hot Dogs, Ham, Bacon & Sausage',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_halal_uuid,
//     name: 'Instant Non-Halal & Canned Goods',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_halal_uuid,
//     name: 'Sauces & Seasoning',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_halal_uuid,
//     name: 'Snacks & Dessert',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_halal_uuid,
//     name: 'Frozen & Packaged Pork',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: plant_based_uuid,
//     name: 'Milk & Eggs',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: plant_based_uuid,
//     name: 'Packaged Cheese',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_food_homeware_uuid,
//     name: 'Batteries & Lighting',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_food_homeware_uuid,
//     name: 'Kitchen & Tableware',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_food_homeware_uuid,
//     name: 'Living & Sleeping',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_food_homeware_uuid,
//     name: 'Lighters, Matches & Charcoal',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_food_homeware_uuid,
//     name: 'Clothes',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_food_homeware_uuid,
//     name: 'Stationery',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_food_homeware_uuid,
//     name: 'Party & Occasions',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_food_homeware_uuid,
//     name: 'Toys & Games',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_food_homeware_uuid,
//     name: 'Automative Care',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_food_homeware_uuid,
//     name: 'Electric Appliances',
//   },
//   {
//     uuid: uuidv4(),
//     category_uuid: non_food_homeware_uuid,
//     name: 'Hardware & Tools',
//   },
// ]);
