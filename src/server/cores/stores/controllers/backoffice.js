const { v4: uuidv4 } = require('uuid');
const Store = require('../model');
const getLogger = require('../../../utils/logger');

const storeLogger = getLogger(__filename, 'store');

exports.getAllStores = async (req, res, next) => {
  try {
    const stores = await Store.query();
    storeLogger.info(`Successfully retrieve stores: ${stores.length} stores`);
    res.json(stores);
  } catch (err) {
    storeLogger.warn(`Error retrieving all stores`);
    next(err);
  }
};

exports.findStore = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const store = await Store.query().findById(uuid);
    storeLogger.info(`Successfully retrieve store: ${store.uuid}`);
    res.json(store);
  } catch (err) {
    storeLogger.warn(`Error retrieving store`);
    next(err);
  }
};

exports.removeStore = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    await Store.query().deleteById(uuid);
    const logMessage = `Successfully delete store: ${uuid}`;
    storeLogger.info(logMessage);
    res.json({ message: logMessage });
  } catch (err) {
    storeLogger.warn(`Error deleting store`);
    next(err);
  }
};

exports.createStore = async (req, res, next) => {
  try {
    const store = await Store.query().insert({ ...req.body, uuid: uuidv4() });
    storeLogger.info(`store successfully created with [UUID -${store.uuid}]`);
    res.json(store);
  } catch (err) {
    storeLogger.warn(`Error creating store`);
    next(err);
  }
};

exports.editStore = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const store = await Store.query().patchAndFetchById(uuid, {
      uuid,
      ...req.body,
    });
    storeLogger.info(`store successfully update: ${store.uuid}`);
    res.json(store);
  } catch (err) {
    storeLogger.warn(`Error creating store`);
    next(err);
  }
};
