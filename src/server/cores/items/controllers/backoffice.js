const { v4: uuidv4 } = require('uuid');
const Item = require('../model');
const getLogger = require('../../../utils/logger');

const itemLogger = getLogger(__filename, 'item');

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.query();
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

exports.createItem = async (req, res, next) => {
  try {
    const item = await Item.query().insert({ ...req.body, uuid: uuidv4() });
    itemLogger.info(`item successfully created with [UUID -${item.uuid}]`);
    res.json(item);
  } catch (err) {
    itemLogger.warn(`Error creating item`);
    next(err);
  }
};

exports.editItem = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    // const { uuid, ...patchData } = req.body;
    const item = await Item.query().patchAndFetchById(uuid, {
      uuid,
      ...req.body,
    });
    itemLogger.info(`item successfully update: ${item.uuid}`);
    res.json(item);
  } catch (err) {
    itemLogger.warn(`Error creating item`);
    next(err);
  }
};
