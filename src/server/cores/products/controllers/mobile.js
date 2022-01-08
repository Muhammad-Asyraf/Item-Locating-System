const Product = require('../model');
const Store = require('../../stores/model');
const getLogger = require('../../../utils/logger');

const productLogger = getLogger(__filename, 'product');

exports.searchProducts = async (req, res, next) => {
  try {
    const query = req.query;
    let products;
    if ('uuid' in query && query.uuid != '') {
      products = await Product.query()
        .where('store_uuid', query.uuid)
        .where('is_active', true)
        .where('name', 'ilike', `%${query.search}%`)
        .withGraphFetched('stores');

      // products = await Store.relatedQuery('products')
      //   .for(query.uuid)
      //   .where('name', 'ilike', `%${query.search}%`);
      productLogger.info(
        `Successfully retrieve: ${products.length} products on ${query.search} from store uuid <${query.uuid}>`
      );
      res.json(products);
    } else {
      products = await Product.query()
        .where('is_active', true)
        .where('name', 'ilike', `%${query.search}%`)
        .withGraphFetched('stores');
      productLogger.info(
        `Successfully retrieve: ${products.length} products on ${query.search}`
      );
      res.json(products);
    }
  } catch (err) {
    productLogger.warn(`Error retrieving all products`);
    next(err);
  }
};
