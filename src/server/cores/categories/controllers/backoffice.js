// const { v4: uuidv4 } = require('uuid');
const Category = require('../model');
const getLogger = require('../../../utils/logger');

const categoryLogger = getLogger(__filename, 'category');

exports.getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.query()
      .select('uuid', 'name')
      .withGraphFetched('[sub_categories, image]')
      .modifyGraph('sub_categories', (builder) => {
        builder.select('uuid', 'image_uuid');
      })
      .modifyGraph('image', (builder) => {
        builder.select('path');
      });

    categoryLogger.info(
      `Successfully retrieve categories: ${categories.length}`
    );
    res.json(categories);
  } catch (err) {
    categoryLogger.warn(`Error retrieving categories`);
    next(err);
  }
};
