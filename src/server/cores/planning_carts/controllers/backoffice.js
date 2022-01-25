const PlanningCart = require('../model');
const getLogger = require('../../../utils/logger');

const planningCartLogger = getLogger(__filename, 'backoffice-cart');

exports.getProductsByCart = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const { storeUUID } = req.query;

    const planningCart = await PlanningCart.query()
      .findById(uuid)
      .withGraphFetched('[products.[images, layer]]')
      .modifyGraph('products', (builder) => {
        builder.where('store_uuid', storeUUID);
      });

    const { products, uuid: planningCartUUID } = planningCart || {};

    console.log('LET SEE', products);

    planningCartLogger.info(
      `Successfully get products by planning cart with UUID: ${planningCartUUID}`
    );

    res.json(products);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving planning cart`);
    next(err);
  }
};
