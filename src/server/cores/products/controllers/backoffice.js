const { v4: uuidv4 } = require('uuid');
const Product = require('../model');
const Item = require('../../items/model');
const SubCategory = require('../../categories/sub_categories/model');
const getLogger = require('../../../utils/logger');
const { removeFiles } = require('../../../utils/general');

const productLogger = getLogger(__filename, 'product');

exports.getAllProducts = async (req, res, next) => {
  try {
    const { store_uuid } = req.params;
    const products = await Product.query()
      .where('store_uuid', store_uuid)
      .withGraphFetched(
        '[items, sub_categories.category, images, promotions, layer]'
      )
      .modifyGraph('images', (builder) => {
        builder.select('path');
      })
      .modifyGraph('sub_categories.category', (builder) => {
        builder.select('uuid', 'name');
      })
      .modifyGraph('sub_categories', (builder) => {
        builder.select('uuid', 'name');
      })
      .modifyGraph('promotions', (builder) => {
        builder.select(
          'uuid',
          'name',
          'start_date',
          'end_date',
          'promotion_type'
        );
      });

    console.log('products', products);

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

exports.createMultipleProducts = async (req, res, next) => {
  try {
    const { body: payloadList } = req;
    let subCatList = [];
    let itemList = [];

    payloadList.forEach(({ sub_categories, items }) => {
      subCatList = [...new Set([...subCatList, ...sub_categories])];

      barcodeNumberList = items.map(({ barcode_number }) => barcode_number);
      itemList = [...new Set([...itemList, ...barcodeNumberList])];
    });

    const subCatIds = await SubCategory.query()
      .select('uuid', 'name')
      .whereIn('name', subCatList);

    const itemsIds = await Item.query()
      .select('uuid', 'barcode_number')
      .whereIn('barcode_number', itemList);

    const multipleProductsPayload = payloadList.map((payload) => {
      const {
        items,
        sub_categories,
        barcode_number,
        measurement_value,
        markup_percentage,
        retail_price,
        supply_price,
      } = payload;

      const subCatByUUID = sub_categories.map((subCat) => {
        // get the UUID of the subcat by name
        const subCatUUID = subCatIds.find((obj) => obj.name === subCat).uuid;
        return { uuid: subCatUUID };
      });

      const itemsByUUID = items.map(({ barcode_number, quantity }) => {
        // get the UUID of the items by barcode number
        const itemUUID = itemsIds.find(
          (obj) => obj.barcode_number === barcode_number
        ).uuid;

        return { uuid: itemUUID, quantity };
      });

      return {
        ...payload,
        barcode_number: parseInt(barcode_number, 10),
        measurement_value: parseFloat(measurement_value),
        markup_percentage: parseFloat(markup_percentage),
        retail_price: parseFloat(retail_price),
        supply_price: parseFloat(supply_price),
        sub_categories: subCatByUUID,
        items: itemsByUUID,
      };
    });

    const products = await Product.query().insertGraph(
      multipleProductsPayload,
      {
        relate: ['items', 'sub_categories'],
      }
    );

    productLogger.info(
      `Multiple products [${products.length}] successfully inserted with!`
    );

    res.json(products);
  } catch (err) {
    productLogger.warn(`Error creating product`);
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

exports.saveProductMapping = async (req, res, next) => {
  try {
    const { updatedProducts } = req.body;

    const trx = await Product.startTransaction();

    Promise.all(
      updatedProducts.map(async (updatedProduct) => {
        const { uuid, ...remainingPayload } = updatedProduct;
        return await Product.query(trx)
          .patch(remainingPayload)
          .where('uuid', uuid);
      })
    )
      .then(trx.commit)
      .catch(trx.rollback);

    productLogger.info(`Successfully save product mapping`);
    res.json('test');
  } catch (err) {
    productLogger.warn(`Error saving product's mapping`);
    next(err);
  }
};
