const { v4: uuidv4 } = require('uuid');
const Product = require('../model');
const getLogger = require('../../../utils/logger');

const productLogger = getLogger(__filename, 'product');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.query().withGraphFetched('items');
    productLogger.info(`Successfully retrieve: ${products.length} products`);
    res.json(products);
  } catch (err) {
    productLogger.warn(`Error retrieving all products`);
    next(err);
  }
};

exports.findProduct = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const product = await Product.query()
      .findById(uuid)
      .withGraphFetched('items');
    productLogger.info(`Successfully retrieve product: ${product.uuid}`);
    res.json(product);
  } catch (err) {
    productLogger.warn(`Error retrieving product`);
    next(err);
  }
};

exports.removeProduct = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    await Product.query().deleteById(uuid);
    const logMessage = `Successfully delete product: ${uuid}`;
    productLogger.info(logMessage);
    res.json({ message: logMessage });
  } catch (err) {
    productLogger.warn(`Error deleting product`);
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const payload = req.body;
    const product = await Product.query().insertGraph(
      { ...payload, uuid: uuidv4() },
      { relate: true }
    );
    productLogger.info(
      `product successfully created with [UUID -${JSON.stringify(product)}]`
    );
    res.json(product);
  } catch (err) {
    productLogger.warn(`Error creating product`);
    next(err);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const product = await Product.query().upsertGraph(
      { uuid, ...req.body },
      { unrelate: true }
    );
    productLogger.info(`product successfully update: ${product.uuid}`);
    res.json(product);
  } catch (err) {
    productLogger.warn(`Error updating the product`);
    next(err);
  }
};

exports.patchProduct = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const product = await Product.query().patchAndFetchById(uuid, {
      uuid,
      ...req.body,
    });
    productLogger.info(`product successfull partial update: ${product.uuid}`);
    res.json(product);
  } catch (err) {
    productLogger.warn(`Error partially update the product`);
    next(err);
  }
};
