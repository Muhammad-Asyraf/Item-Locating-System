// const { v4: uuidv4 } = require('uuid');
const SubCategory = require('../model');
const getLogger = require('../../../../utils/logger');

const subCategoryLogger = getLogger(__filename, 'sub_category');

exports.getAllSubCategory = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.query()
      .select('uuid', 'name')
      .withGraphFetched('[category]')
      .modifyGraph('category', (builder) => {
        builder.select('uuid', 'name');
      });

    subCategoryLogger.info(
      `Successfully retrieve sub categories: ${subCategories.length}`
    );
    res.json(subCategories);
  } catch (err) {
    subCategoryLogger.warn(`Error retrieving sub categories`);
    next(err);
  }
};
