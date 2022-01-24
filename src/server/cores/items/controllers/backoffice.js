const { v4: uuidv4 } = require('uuid');
const Item = require('../model');
const SubCategory = require('../../categories/sub_categories/model');
const getLogger = require('../../../utils/logger');
const { removeFiles } = require('../../../utils/general');

const itemLogger = getLogger(__filename, 'item');

exports.getAllItems = async (req, res, next) => {
  try {
    const { store_uuid } = req.params;
    const items = await Item.query()
      .where('store_uuid', store_uuid)
      .withGraphFetched('[sub_categories.category, images]')
      .modifyGraph('images', (builder) => {
        builder.select('path');
      })
      .modifyGraph('sub_categories.category', (builder) => {
        builder.select('uuid', 'name');
      })
      .modifyGraph('sub_categories', (builder) => {
        builder.select('uuid', 'name');
      });

    itemLogger.info(`Successfully retrieve items: ${items.length} items`);
    res.json(items);
  } catch (err) {
    itemLogger.warn(`Error retrieving all items`);
    next(err);
  }
};

exports.findItem = async (req, res, next) => {
  try {
    const { uuid } = req.params;

    // const test = await Item.query()
    //   .findById(uuid)
    //   .withGraphFetched('[products]')
    //   .modifyGraph('products', (builder) => {
    //     builder.where('store_uuid', '60db5d58-5905-4cd2-9d97-53225e58785b');
    //     // builder.where('store_uuid', 'd9d75b4d-6bc8-4dc1-9d61-18cee50cb908');
    //   });

    // console.log('test', test);

    const item = await Item.query()
      .findById(uuid)
      .withGraphFetched('[sub_categories.category, images]')
      .modifyGraph('images', (builder) => {
        builder.select('path');
      })
      .modifyGraph('sub_categories.category', (builder) => {
        builder.select('uuid', 'name');
      })
      .modifyGraph('sub_categories', (builder) => {
        builder.select('uuid', 'name');
      });
    itemLogger.info(`Successfully retrieve item: ${item.uuid}`);
    res.json(item);
  } catch (err) {
    itemLogger.warn(`Error retrieving item`);
    next(err);
  }
};

exports.removeItem = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    await Item.query().deleteById(uuid);
    const logMessage = `Successfully delete item: ${uuid}`;
    itemLogger.info(logMessage);
    res.json({ message: logMessage });
  } catch (err) {
    itemLogger.warn(`Error deleting item`);
    next(err);
  }
};

exports.removeMultipleItem = async (req, res, next) => {
  try {
    const { listToDelete } = req.body;
    await Item.query().delete().whereIn('uuid', listToDelete);

    const logMessage = `Successfully deleted following items: ${listToDelete}`;
    res.json({ message: logMessage });
  } catch (err) {
    itemLogger.warn(`Error deleting item`);
    next(err);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const {
      barcode_number,
      name,
      wholesale_price,
      note,
      sub_category,
      store_uuid,
    } = req.body;
    const { files: imgFiles } = req;
    const item_sub_category = JSON.parse(sub_category);

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

    const item = await Item.query().insertGraph(
      {
        name,
        note,
        store_uuid,
        barcode_number: parseInt(barcode_number, 10),
        wholesale_price: parseFloat(wholesale_price),
        sub_categories: item_sub_category,
        images: new_images,
      },
      { relate: ['sub_categories'] }
    );

    itemLogger.info(`item successfully created with [UUID -${item.uuid}]`);
    res.json(item);
  } catch (err) {
    itemLogger.warn(`Error creating item`);
    await removeFiles(req.files);
    next(err);
  }
};

exports.createMultipleItems = async (req, res, next) => {
  try {
    const { body: payloadList } = req;
    let subCatList = [];

    payloadList.forEach(({ sub_categories }) => {
      subCatList = [...new Set([...subCatList, ...sub_categories])];
    });

    const subCatIds = await SubCategory.query()
      .select('uuid', 'name')
      .whereIn('name', subCatList);

    const multipleItemsPayload = payloadList.map((payload) => {
      const { sub_categories, barcode_number, wholesale_price } = payload;

      const subCatByUUID = sub_categories.map((subCat) => {
        // get the UUID of the subcat by name
        const subCatUUID = subCatIds.find((obj) => obj.name === subCat).uuid;
        return { uuid: subCatUUID };
      });

      return {
        ...payload,
        barcode_number: parseInt(barcode_number, 10),
        wholesale_price: parseFloat(wholesale_price),
        sub_categories: subCatByUUID,
      };
    });

    const items = await Item.query().insertGraph(multipleItemsPayload, {
      relate: ['sub_categories'],
    });

    itemLogger.info(
      `Multiple items [${items.length}] successfully inserted with!`
    );
    res.json(items);
  } catch (err) {
    itemLogger.warn(`Error inserting multiple items`);
    next(err);
  }
};

exports.editItem = async (req, res, next) => {
  try {
    const {
      barcode_number,
      name,
      wholesale_price,
      note,
      sub_category,
      store_uuid,
      old_imgs,
    } = req.body;
    const { uuid } = req.params;
    const { files: imgFiles } = req;
    const item_sub_category = JSON.parse(sub_category);
    const item_old_imgs = JSON.parse(old_imgs);

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

    const item = await Item.query().patchAndFetchById(uuid, {
      name,
      note,
      store_uuid,
      barcode_number: parseInt(barcode_number, 10),
      wholesale_price: parseFloat(wholesale_price),
    });

    // if no duplicates, then proceed with relationship query
    await Item.query().upsertGraph(
      {
        uuid,
        sub_categories: item_sub_category,
        images: new_images,
      },
      {
        relate: ['sub_categories'],
        unrelate: ['sub_categories'],
      }
    );

    if (item_old_imgs && item) {
      await removeFiles(item_old_imgs);
    }

    itemLogger.info(`item successfully update: ${item.uuid}`);
    res.json(item);
  } catch (err) {
    itemLogger.warn(`Error editing item`);
    await removeFiles(req.files);
    next(err);
  }
};
