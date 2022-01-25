const momentTz = require('moment-timezone');
const Promotion = require('../model');
const getLogger = require('../../../utils/logger');

const promotionLogger = getLogger(__filename, 'pro motion');

exports.getAllPromotions = async (req, res, next) => {
  try {
    const { store_uuid } = req.params;
    const promotions = await Promotion.query()
      .where('store_uuid', store_uuid)
      .withGraphFetched(
        '[products, products.[images, sub_categories, promotions], campaign]'
      );

    // .modifyGraph('images', (builder) => {
    //   builder.select('path');
    // })
    // .modifyGraph('sub_categories.category', (builder) => {
    //   builder.select('uuid', 'name');
    // })

    const updatedPromotions = promotions.map((promotion) => {
      const {
        promotion_type,
        products,
        meta_data: { discount, discountType },
      } = promotion;

      const isDiscountBasedPromo =
        promotion_type === 'Basic' || promotion_type === 'Bundle';

      const updatedProducts = products.map((product) => {
        const { retail_price: retailPrice, promotions } = product;
        let sale_price;

        if (isDiscountBasedPromo) {
          if (discountType.percentage_off_checked) {
            saving = (parseFloat(discount) / 100) * parseFloat(retailPrice);
          } else {
            saving = parseFloat(discount);
          }
          sale_price = parseFloat(retailPrice) - saving;
        }

        const updatedPromotion = promotions.map((promotion) => {
          const { start_date, end_date, promotion_type } = promotion;
          let sale_price;

          const currentDateTime = new Date().getTime();
          const startDateTime = new Date(start_date).getTime();
          const endDateTime = new Date(end_date).getTime();

          const activePromotion =
            currentDateTime >= startDateTime && currentDateTime <= endDateTime;
          const scheduledPromotion =
            currentDateTime <= startDateTime && currentDateTime <= endDateTime;
          const expiredPromotion =
            currentDateTime >= startDateTime && currentDateTime >= endDateTime;

          let promotion_status;

          if (activePromotion) {
            promotion_status = 'active';
          } else if (scheduledPromotion) {
            promotion_status = 'scheduled';
          } else if (expiredPromotion) {
            promotion_status = 'expired';
          }

          const isDiscountBasedPromo =
            promotion_type === 'Basic' || promotion_type === 'Bundle';

          if (isDiscountBasedPromo) {
            const {
              meta_data: { discount, discountType },
            } = promotion;
            let saving;

            if (discountType.percentage_off_checked) {
              saving = (parseFloat(discount) / 100) * parseFloat(retailPrice);
            } else {
              saving = parseFloat(discount);
            }

            sale_price = parseFloat(retailPrice) - saving;
          }

          return {
            ...promotion,
            promotion_status,
            sale_price,
          };
        });

        return {
          ...product,
          sale_price,
          promotions: updatedPromotion,
        };
      });

      return {
        ...promotion,
        products: updatedProducts,
      };
    });

    promotionLogger.info(
      `Successfully retrieve: ${promotions.length} promotions`
    );
    res.json(updatedPromotions);
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

exports.removeMultiplePromotion = async (req, res, next) => {
  try {
    const { listToDelete } = req.body;
    await Promotion.query().delete().whereIn('uuid', listToDelete);

    const logMessage = `Successfully deleted following promotions: ${listToDelete}`;
    res.json({ message: logMessage });
  } catch (err) {
    promotionLogger.warn(`Error deleting promotions`);
    next(err);
  }
};

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
      selectedPromoProducts,
      meta_data: metaData,
    } = req.body;
    const selectedProducts = JSON.parse(selectedPromoProducts);
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

    const startDateTime = new Date(`${startDate} ${startTime} GMT+0800`);
    const endDateTime = new Date(`${endDate} ${endTime} GMT+0800`);

    const currentPromotionStartDateTime = startDateTime.getTime();
    const currentPromotionEndDateTime = endDateTime.getTime();
    const errorMessages = [];

    // (StartA <= EndB)  and  (EndA >= StartB) => if true mean overlapping promotion date with same promo type
    selectedProducts.forEach(({ promotions, name: productName }) => {
      if (promotions && promotions.length > 0) {
        promotions.forEach(
          ({
            start_date,
            end_date,
            promotion_type: currentPromoType,
            name: promoName,
          }) => {
            const start__Date = new Date(start_date).getTime();
            const end__Date = new Date(end_date).getTime();

            if (
              currentPromotionStartDateTime <= end__Date &&
              currentPromotionEndDateTime >= start__Date &&
              currentPromoType === promotion_type
            ) {
              const formattedStartDate = momentTz
                .tz(new Date(start__Date), 'Asia/Kuala_Lumpur')
                .format('DD/MM/YYYY hh:mm a');

              const formattedEndDate = momentTz
                .tz(new Date(end__Date), 'Asia/Kuala_Lumpur')
                .format('DD/MM/YYYY hh:mm a');

              const errMessage = `Product "${productName}" already has a ${currentPromoType.toLowerCase()} promotion applied on the chosen dates. The conflicted promotion "${promoName}" effective date is as follows: ${formattedStartDate} — ${formattedEndDate}`;
              // const errMessage = `Product "${productName}" already has a ${currentPromoType.toLowerCase()} promotion applied on the chosen dates. Please refer to promotion "${promoName}" (${formattedStartDate} — ${formattedEndDate}) for further details`;
              errorMessages.push(errMessage);
            }
          }
        );
      }
    });

    if (errorMessages.length > 0) {
      throw {
        name: 'ConflictError',
        message: JSON.stringify(errorMessages),
      };
    } else {
      const products = selectedProducts.map(({ uuid }) => {
        return { uuid };
      });

      const promotion = await Promotion.query().insertGraph(
        {
          name,
          start_date: startDateTime.toISOString(),
          end_date: endDateTime.toISOString(),
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

      res.json(promotion);
    }
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
      selectedPromoProducts,
      meta_data: metaData,
    } = req.body;
    const selectedProducts = JSON.parse(selectedPromoProducts);
    const meta_data = JSON.parse(metaData);
    const { uuid } = req.params;

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

    const startDateTime = new Date(`${startDate} ${startTime} GMT+0800`);
    const endDateTime = new Date(`${endDate} ${endTime} GMT+0800`);

    const currentPromotionStartDateTime = startDateTime.getTime();
    const currentPromotionEndDateTime = endDateTime.getTime();
    const errorMessages = [];

    // (StartA <= EndB)  and  (EndA >= StartB) => if true mean overlapping promotion date with same promo type
    selectedProducts.forEach(({ promotions, name: productName }) => {
      if (promotions && promotions.length > 0) {
        promotions.forEach(
          ({
            start_date,
            end_date,
            promotion_type: currentPromoType,
            name: promoName,
          }) => {
            const start__Date = new Date(start_date).getTime();
            const end__Date = new Date(end_date).getTime();

            if (
              currentPromotionStartDateTime <= end__Date &&
              currentPromotionEndDateTime >= start__Date &&
              currentPromoType === promotion_type
            ) {
              const formattedStartDate = momentTz
                .tz(new Date(start__Date), 'Asia/Kuala_Lumpur')
                .format('DD/MM/YYYY hh:mm a');

              const formattedEndDate = momentTz
                .tz(new Date(end__Date), 'Asia/Kuala_Lumpur')
                .format('DD/MM/YYYY hh:mm A');

              const errMessage = `Product "${productName}" already has a ${currentPromoType.toLowerCase()} promotion applied on the chosen dates. The conflicted promotion "${promoName}" effective date is as follows: ${formattedStartDate} — ${formattedEndDate}`;
              errorMessages.push(errMessage);
            }
          }
        );
      }
    });

    if (errorMessages.length > 0) {
      throw {
        name: 'ConflictError',
        message: JSON.stringify(errorMessages),
      };
    } else {
      const products = selectedProducts.map(({ uuid: productUUID, name }) => {
        return { uuid: productUUID };
      });

      const promotion = await Promotion.query().upsertGraph(
        {
          uuid,
          name,
          start_date: startDateTime.toISOString(),
          end_date: endDateTime.toISOString(),
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

      res.json(promotion);
    }
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

// exports.getAllPromotions = async (req, res, next) => {
//   try {
//     const { store_uuid } = req.params;
//     const promotions = await Promotion.query()
//       .where('store_uuid', store_uuid)
//       .withGraphFetched(
//         '[products, products.[images, sub_categories, promotions], campaign]'
//       );

//     // .modifyGraph('images', (builder) => {
//     //   builder.select('path');
//     // })
//     // .modifyGraph('sub_categories.category', (builder) => {
//     //   builder.select('uuid', 'name');
//     // })

//     const updatedPromotions = promotions.map((promotion) => {
//       const { promotion_type } = promotion;
//       let updatedProducts;

//       const isDiscountBasedPromo =
//         promotion_type === 'Basic' || promotion_type === 'Bundle';

//       if (isDiscountBasedPromo) {
//         const { products, ...remainingAtts } = promotion;
//         const {
//           meta_data: { discount, discountType },
//         } = promotion;

//         updatedProducts = products.map((product) => {
//           const { retail_price: retailPrice } = product;

//           if (discountType.percentage_off_checked) {
//             saving = (parseFloat(discount) / 100) * parseFloat(retailPrice);
//           } else {
//             saving = parseFloat(discount);
//           }

//           salePrice = parseFloat(retailPrice) - saving;

//           return {
//             ...product,
//             sale_price: salePrice,
//           };
//         });

//         return {
//           ...remainingAtts,
//           products: updatedProducts,
//         };
//       }

//       return promotion;
//     });

//     promotionLogger.info(
//       `Successfully retrieve: ${promotions.length} promotions`
//     );
//     res.json(updatedPromotions);
//   } catch (err) {
//     promotionLogger.warn(`Error retrieving all promotions`);
//     next(err);
//   }
// };
