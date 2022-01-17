const Product = require('../model');
const Store = require('../../stores/model');
const Category = require('../../categories/model');
const SubCategory = require('../../categories/sub_categories/model');
const getLogger = require('../../../utils/logger');

const productLogger = getLogger(__filename, 'product');

exports.searchProducts = async (req, res, next) => {
  try {
    const query = req.query;
    // console.log(JSON.stringify(query));
    let productQuery;

    if ('category' in query && query?.category != '') {
      let subcategories = SubCategory.query().where(
        'category_uuid',
        query.category
      );
      productQuery = SubCategory.relatedQuery('products')
        .for(subcategories)
        .withGraphFetched('[sub_categories.category]');
    } else if ('subcategory' in query && query?.subcategory != '') {
      productQuery = SubCategory.relatedQuery('products')
        .for(query.subcategory)
        .withGraphFetched('[sub_categories.category]');
    } else {
      productQuery = Product.query();
    }

    if ('uuid' in query && query?.uuid != '') {
      productQuery = productQuery.where('store_uuid', query.uuid);
    }

    // Add where clause for search
    // productQuery = productQuery
    //   .where('name', 'ilike', `%${query.search}%`)
    //   .withGraphFetched('stores');

    const products = await productQuery
      .where('name', 'ilike', `%${query.search}%`)
      .withGraphFetched('stores');
    res.json(products);

    // let products;
    // if ('uuid' in query && query.uuid != '') {
    //   products = await Product.query()
    //     .where('store_uuid', query.uuid)
    //     .where('is_active', true)
    //     .where('name', 'ilike', `%${query.search}%`)
    //     .withGraphFetched('stores');

    //   // products = await Store.relatedQuery('products')
    //   //   .for(query.uuid)
    //   //   .where('name', 'ilike', `%${query.search}%`);
    //   productLogger.info(
    //     `Successfully retrieve: ${products.length} products on ${query.search} from store uuid <${query.uuid}>`
    //   );
    //   res.json(products);
    // } else {
    //   products = await Product.query()
    //     .where('is_active', true)
    //     .where('name', 'ilike', `%${query.search}%`)
    //     .withGraphFetched('stores');
    //   productLogger.info(
    //     `Successfully retrieve: ${products.length} products on ${query.search}`
    //   );
    //   res.json(products);
    // }
  } catch (err) {
    productLogger.warn(`Error retrieving all products`);
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.query().select(
      'uuid',
      'name',
      'image_uuid'
    );

    res.json(categories);
  } catch (error) {
    productLogger.warn(`Error retrieving categories`);
    next(err);
  }
};

exports.getSubCategories = async (req, res, next) => {
  try {
    const { category_uuid } = req.params;
    const subcategories = await Category.relatedQuery('sub_categories')
      .for(category_uuid)
      .select('uuid', 'name', 'image_uuid');

    res.json(subcategories);
  } catch (error) {
    productLogger.warn(`Error retrieving subcategories`);
    next(err);
  }
};
