const momentTz = require('moment-timezone');
const Promotion = require('../model');
const getLogger = require('../../../utils/logger');

const promotionLogger = getLogger(__filename, 'pro motion');

exports.getAllPromotions = async (req, res, next) => {
  try {
    const { store_uuid } = req.params;
    const promotions = await Promotion.query()
      .where('store_uuid', store_uuid)
      .withGraphFetched('[products, campaign]');

    // .modifyGraph('images', (builder) => {
    //   builder.select('path');
    // })
    // .modifyGraph('sub_categories.category', (builder) => {
    //   builder.select('uuid', 'name');
    // })
    // .modifyGraph('sub_categories', (builder) => {
    //   builder.select('uuid', 'name');
    // });

    promotionLogger.info(
      `Successfully retrieve: ${promotions.length} promotions`
    );
    res.json(promotions);
  } catch (err) {
    promotionLogger.warn(`Error retrieving all promotions`);
    next(err);
  }
};

exports.findPromotion = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const promotion = await Promotion.query()
      .findById(uuid)
      .withGraphFetched('[products, campaign]');

    // .modifyGraph('products', (builder) => {
    //   builder.select('path');
    // })
    // .modifyGraph('campaign', (builder) => {
    //   builder.select('uuid', 'name');
    // })

    const { start_date, end_date } = promotion;

    let startDate = momentTz
      .tz(new Date(start_date), 'Asia/Kuala_Lumpur')
      .format('MMM DD YYYY');

    let endDate = momentTz
      .tz(new Date(end_date), 'Asia/Kuala_Lumpur')
      .format('MMM DD YYYY');

    let startTime = momentTz
      .tz(new Date(start_date), 'Asia/Kuala_Lumpur')
      .format('MMM DD YYYY HH:mm:ss');

    let endTime = momentTz
      .tz(new Date(end_date), 'Asia/Kuala_Lumpur')
      .format('MMM DD YYYY HH:mm:ss');

    startDate = `${startDate} 00:00:00 GMT+0800`;
    endDate = `${endDate} 00:00:00 GMT+0800`;
    startTime = `${startTime} GMT+0800`;
    endTime = `${endTime} GMT+0800`;

    const resPayload = {
      ...promotion,
      startDate,
      endDate,
      startTime,
      endTime,
    };

    promotionLogger.info(`Successfully retrieve promotion: ${promotion.uuid}`);
    res.json(resPayload);
  } catch (err) {
    promotionLogger.warn(`Error retrieving promotion`);
    next(err);
  }
};

exports.removePromotion = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    await Promotion.query().deleteById(uuid);
    const logMessage = `Successfully delete promotion: ${uuid}`;
    promotionLogger.info(logMessage);
    res.json({ message: logMessage });
  } catch (err) {
    promotionLogger.warn(`Error deleting promotion`);
    next(err);
  }
};

// exports.removeMultipleProduct = async (req, res, next) => {
//   try {
//     const { listToDelete } = req.body;
//     // promotionLogger.debug(`Checking payload ${JSON.stringify(listToDelete)}`);
//     await Product.query().delete().whereIn('uuid', listToDelete);

//     const logMessage = `Successfully deleted following products: ${listToDelete}`;
//     res.json({ message: logMessage });
//   } catch (err) {
//     promotionLogger.warn(`Error deleting products`);
//     next(err);
//   }
// };

exports.createPromotion = async (req, res, next) => {
  try {
    const {
      name,
      description,
      start_date,
      end_date,
      start_time,
      end_time,
      promotion_type,
      store_uuid,
      campaign_uuid,
      meta_data: metaData,
      products: selectedProducts,
    } = req.body;
    const products = JSON.parse(selectedProducts);
    const meta_data = JSON.parse(metaData);

    const startDate = momentTz
      .tz(new Date(start_date), 'Asia/Kuala_Lumpur')
      .format('YYYY-MM-DD');
    const startTime = momentTz
      .tz(new Date(start_time), 'Asia/Kuala_Lumpur')
      .format('HH:mm:ss');

    const endDate = momentTz
      .tz(new Date(end_date), 'Asia/Kuala_Lumpur')
      .format('YYYY-MM-DD');
    const endTime = momentTz
      .tz(new Date(end_time), 'Asia/Kuala_Lumpur')
      .format('HH:mm:ss');

    const startDateTime = new Date(
      `${startDate} ${startTime} GMT+0800`
    ).toISOString();

    const endDateTime = new Date(
      `${endDate} ${endTime} GMT+0800`
    ).toISOString();

    const promotion = await Promotion.query().insertGraph(
      {
        name,
        start_date: startDateTime,
        end_date: endDateTime,
        promotion_type,
        meta_data,
        store_uuid,
        campaign_uuid,
        description,
        products,
      },
      { relate: ['products'] }
    );

    promotionLogger.info(
      `promotion successfully created with [UUID -${promotion.uuid}]`
    );

    console.log(promotion);

    res.json(promotion);
  } catch (err) {
    promotionLogger.warn(`Error creating promotion`);
    next(err);
  }
};

exports.editPromotion = async (req, res, next) => {
  try {
    const {
      name,
      description,
      start_date,
      end_date,
      start_time,
      end_time,
      promotion_type,
      store_uuid,
      campaign_uuid,
      meta_data: metaData,
      products: selectedProducts,
    } = req.body;
    const products = JSON.parse(selectedProducts);
    const meta_data = JSON.parse(metaData);

    console.log('name', name);
    console.log('description', description);
    console.log('start_date', start_date);
    console.log('end_date', end_date);
    console.log('start_time', start_time);
    console.log('end_time', end_time);
    console.log('promotion_type', promotion_type);
    console.log('store_uuid', store_uuid);
    console.log('campaign_uuid', campaign_uuid);
    console.log('products', products);
    console.log('meta_data', meta_data);

    const startDate = momentTz
      .tz(new Date(start_date), 'Asia/Kuala_Lumpur')
      .format('YYYY-MM-DD');
    const startTime = momentTz
      .tz(new Date(start_time), 'Asia/Kuala_Lumpur')
      .format('HH:mm:ss');

    const endDate = momentTz
      .tz(new Date(end_date), 'Asia/Kuala_Lumpur')
      .format('YYYY-MM-DD');
    const endTime = momentTz
      .tz(new Date(end_time), 'Asia/Kuala_Lumpur')
      .format('HH:mm:ss');

    const startDateTime = new Date(
      `${startDate} ${startTime} GMT+0800`
    ).toISOString();

    const endDateTime = new Date(
      `${endDate} ${endTime} GMT+0800`
    ).toISOString();

    console.log(
      momentTz
        .tz(new Date(startDateTime), 'Asia/Kuala_Lumpur')
        .format('DD/MM/YYYY HH:mm:ss')
    );
    console.log(
      momentTz
        .tz(new Date(endDateTime), 'Asia/Kuala_Lumpur')
        .format('DD/MM/YYYY HH:mm:ss')
    );

    console.log(startDateTime);
    console.log(endDateTime);

    const promotion = await Promotion.query().patchAndFetchById(
      uuid,
      {
        name,
        start_date: startDateTime,
        end_date: endDateTime,
        promotion_type,
        meta_data,
        store_uuid,
        campaign_uuid,
        description,
        products,
      },
      { relate: ['products'] }
    );

    promotionLogger.info(
      `promotion  with [UUID -${promotion.uuid}] successfully updated`
    );

    console.log(promotion);

    res.json(promotion);
  } catch (err) {
    promotionLogger.warn(`Error updating promotion`);
    next(err);
  }
};

// exports.patchProduct = async (req, res, next) => {
//   try {
//     const { uuid } = req.params;
//     const product = await Product.query().patchAndFetchById(uuid, {
//       uuid,
//       ...req.body,
//     });
//     promotionLogger.info(`product successfull partial update: ${product.uuid}`);
//     res.json(product);
//   } catch (err) {
//     promotionLogger.warn(`Error partially update the product`);
//     next(err);
//   }
// };

// exports.patchMultipleProduct = async (req, res, next) => {
//   try {
//     const { listToUpdate, updatedPayload } = req.body;

//     await Product.query().patch(updatedPayload).whereIn('uuid', listToUpdate);

//     const logMessage = `Successfully patching the following products: ${listToUpdate}`;
//     res.json({ message: logMessage });
//   } catch (err) {
//     promotionLogger.warn(`Error patching the products `);
//     next(err);
//   }
// };

// exports.saveProductMapping = async (req, res, next) => {
//   try {
//     const { updatedProducts } = req.body;

//     const trx = await Product.startTransaction();

//     Promise.all(
//       updatedProducts.map(async (updatedProduct) => {
//         const { uuid, ...remainingPayload } = updatedProduct;
//         return await Product.query(trx)
//           .patch(remainingPayload)
//           .where('uuid', uuid);
//       })
//     )
//       .then(trx.commit)
//       .catch(trx.rollback);

//     promotionLogger.info(`Successfully save product mapping`);
//     res.json('test');
//   } catch (err) {
//     promotionLogger.warn(`Error saving product's mapping`);
//     next(err);
//   }
// };
