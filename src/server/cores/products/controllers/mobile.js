const Product = require('../model');
const getLogger = require('../../../utils/logger');

const productLogger = getLogger(__filename, 'product');

exports.searchProducts = async (req, res, next) => {
    try {
        const { search } = req.query
        const products = await Product.query().where('name','ilike',`%${search}%`)
        productLogger.info(`Successfully retrieve: ${products.length} products on ${search}`);
        res.json(products);
      } catch (err) {
        productLogger.warn(`Error retrieving all products`);
        next(err);
      }
}