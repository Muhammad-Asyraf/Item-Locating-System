const Store = require('../model');
const Category = require('../../categories/model');
const SubCategory = require('../../categories/sub_categories/model');
const Product = require('../../products/model');
const getLogger = require('../../../utils/logger');

const storeLogger = getLogger(__filename, 'store');

exports.getStores = async (req, res, next) => {
  try {
    const query = req.query;
    let storeQuery = Store.query();

    if ('uuid' in query && query?.uuid != '') {
      storeQuery = storeQuery.where('uuid', query.uuid);
    }

    const stores = await storeQuery;
    res.json(stores);
  } catch (err) {
    storeLogger.warn(`Error getting stores list`);
    next(err);
  }
};

exports.getStoreProducts = async (req, res, next) => {
  try {
    const query = req.query;
    let productQuery = Store.relatedQuery('products').for(query.uuid);

    if ('type' in query && query?.type != '') {
      if (query?.type == 'promotional') {
      } else if (query?.type == 'bitl') {
        productQuery = productQuery.where('product.stock_status', 'Low Stock');
      }
    }

    const products = await productQuery.withGraphFetched('stores');
    res.json(products);
  } catch (err) {
    storeLogger.warn(`Error getting store's products`);
    next(err);
  }
};
