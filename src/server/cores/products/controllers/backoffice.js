const { v4: uuidv4 } = require('uuid');
const Product = require('../model');
const getLogger = require('../../../utils/logger');
const { removeFiles } = require('../../../utils/general');

const productLogger = getLogger(__filename, 'product');

exports.getAllProducts = async (req, res, next) => {
  try {
    const { store_uuid } = req.params;
    const products = await Product.query()
      .where('store_uuid', store_uuid)
      .withGraphFetched('[items, sub_categories.category, images]')
      .modifyGraph('images', (builder) => {
        builder.select('path');
      })
      .modifyGraph('sub_categories.category', (builder) => {
        builder.select('uuid', 'name');
      })
      .modifyGraph('sub_categories', (builder) => {
        builder.select('uuid', 'name');
      });

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
      .withGraphFetched('[items, sub_categories.category, images]')
      .modifyGraph('images', (builder) => {
        builder.select('path');
      })
      .modifyGraph('sub_categories.category', (builder) => {
        builder.select('uuid', 'name');
      })
      .modifyGraph('sub_categories', (builder) => {
        builder.select('uuid', 'name');
      });

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

exports.removeMultipleProduct = async (req, res, next) => {
  try {
    const { listToDelete } = req.body;
    // productLogger.debug(`Checking payload ${JSON.stringify(listToDelete)}`);
    await Product.query().delete().whereIn('uuid', listToDelete);

    const logMessage = `Successfully deleted following products: ${listToDelete}`;
    res.json({ message: logMessage });
  } catch (err) {
    productLogger.warn(`Error deleting products`);
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      barcode_number,
      description,
      sub_category,
      stock_status,
      measurement_value,
      measurement_unit,
      product_item: items,
      markup_percentage,
      retail_price,
      store_uuid,
      product_type,
      supply_price,
    } = req.body;
    const { files: imgFiles } = req;
    const product_sub_category = JSON.parse(sub_category);
    const product_item = JSON.parse(items);

    const new_images = imgFiles.map(
      ({
        fieldname,
        originalname,
        encoding,
        mimetype,
        destination,
        filename,
        size,
        ...keepAttrs
      }) => keepAttrs
    );

    const product = await Product.query().insertGraph(
      {
        uuid: uuidv4(),
        name,
        description,
        store_uuid,
        stock_status,
        measurement_unit,
        product_type,
        is_active: false,
        barcode_number: parseInt(barcode_number, 10),
        measurement_value: parseFloat(measurement_value),
        markup_percentage: parseFloat(markup_percentage),
        retail_price: parseFloat(retail_price),
        supply_price: parseFloat(supply_price),
        items: product_item,
        sub_categories: product_sub_category,
        images: new_images,
      },
      { relate: ['items', 'sub_categories'] }
    );

    productLogger.info(
      `product successfully created with [UUID -${product.uuid}]`
    );

    res.json(product);
  } catch (err) {
    productLogger.warn(`Error creating product`);
    await removeFiles(req.files);
    next(err);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const {
      name,
      barcode_number,
      description,
      sub_category,
      stock_status,
      measurement_value,
      measurement_unit,
      product_item: items,
      markup_percentage,
      retail_price,
      store_uuid,
      product_type,
      supply_price,
      old_imgs,
    } = req.body;
    const { uuid } = req.params;
    const { files: imgFiles } = req;
    const product_sub_category = JSON.parse(sub_category);
    const product_item = JSON.parse(items);
    const product_old_imgs = JSON.parse(old_imgs);

    const new_images = imgFiles.map(
      ({
        fieldname,
        originalname,
        encoding,
        mimetype,
        destination,
        filename,
        size,
        ...keepAttrs
      }) => keepAttrs
    );

    const product = await Product.query().patchAndFetchById(uuid, {
      name,
      description,
      store_uuid,
      stock_status,
      measurement_unit,
      product_type,
      barcode_number: parseInt(barcode_number, 10),
      measurement_value: parseFloat(measurement_value),
      markup_percentage: parseFloat(markup_percentage),
      retail_price: parseFloat(retail_price),
      supply_price: parseFloat(supply_price),
    });

    // if no duplicates, then proceed with relationship query
    await Product.query().upsertGraph(
      {
        uuid,
        items: product_item,
        sub_categories: product_sub_category,
        images: new_images,
      },
      {
        relate: ['items', 'sub_categories'],
        unrelate: ['items', 'sub_categories'],
      }
    );

    if (product_old_imgs && product) {
      await removeFiles(product_old_imgs);
    }

    productLogger.info(
      `product successfully updated with [UUID -${product.uuid}]`
    );
    res.json(product);
  } catch (err) {
    productLogger.warn(`Error updating the product`);
    await removeFiles(req.files);
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

exports.patchMultipleProduct = async (req, res, next) => {
  try {
    const { listToUpdate, updatedPayload } = req.body;

    await Product.query().patch(updatedPayload).whereIn('uuid', listToUpdate);

    const logMessage = `Successfully patching the following products: ${listToUpdate}`;
    res.json({ message: logMessage });
  } catch (err) {
    productLogger.warn(`Error patching the products `);
    next(err);
  }
};
