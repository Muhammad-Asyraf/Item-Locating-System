const PlanningCart = require('../model');
const Product = require('../../products/model');
const getLogger = require('../../../utils/logger');

const planningCartLogger = getLogger(__filename, 'backoffice-cart');

exports.getProductsByCart = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const { storeUUID } = req.query;

    console.log('LET SEE', uuid, storeUUID);

    planningCartLogger.info(`Successfully get planning cart `);

    res.json('Yezzaaa');
  } catch (err) {
    planningCartLogger.warn(`Error retrieving planning cart`);
    next(err);
  }
};
