const { v4: uuidv4 } = require('uuid');
const Item = require('../model');
const Image = require('../../images/model');
const fs = require('fs');
const getLogger = require('../../../utils/logger');
const { removeFiles } = require('../../../utils/general');

const itemLogger = getLogger(__filename, 'item');

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.query()
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
    const item = await Item.query().findById(uuid);
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
    const itemId = uuidv4();

    const images = imgFiles.map(
      ({
        fieldname,
        originalname,
        encoding,
        mimetype,
        destination,
        size,
        ...keepAttrs
      }) => {
        return {
          uuid: uuidv4(),
          item_uuid: itemId,
          path: keepAttrs.path,
        };
      }
    );

    // console.log(barcode_number);
    // console.log(name);
    // console.log(wholesale_price);
    // console.log(note);
    // console.log(item_sub_category);
    // console.log(imgFiles);
    // console.log(images);
    // res.json('ss');

    const item = await Item.query().insertGraph(
      {
        uuid: itemId,
        name,
        note,
        store_uuid,
        barcode_number: parseInt(barcode_number, 10),
        wholesale_price: parseFloat(wholesale_price),
        sub_categories: item_sub_category,
      },
      { relate: true }
    );

    await Image.query().insert(images);

    itemLogger.info(`item successfully created with [UUID -${item.uuid}]`);
    res.json(item);
  } catch (err) {
    itemLogger.warn(`Error creating item`);
    await removeFiles(req.files);
    next(err);
  }
};

exports.editItem = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const { barcode_number, quantity, wholesale_price } = req.body;

    const item = await Item.query().patchAndFetchById(uuid, {
      ...req.body,
      barcode_number: parseInt(barcode_number, 10),
      wholesale_price: parseFloat(wholesale_price),
      quantity: parseInt(quantity, 10),
    });
    itemLogger.info(`item successfully update: ${item.uuid}`);
    res.json(item);
  } catch (err) {
    itemLogger.warn(`Error creating item`);
    next(err);
  }
};
