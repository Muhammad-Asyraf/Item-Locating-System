const PlanningCart = require('../model');
const getLogger = require('../../../utils/logger');

const planningCartLogger = getLogger(__filename, 'backoffice-cart');

exports.getProductsByCart = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const { storeUUID } = req.query;

    const planningCart = await PlanningCart.query()
      .findById(uuid)
      .withGraphFetched('[products.[images, layer.layout, promotions]]')
      .modifyGraph('products', (builder) => {
        builder.where('store_uuid', storeUUID);
      });
    let updatedProducts;

    const { products, uuid: planningCartUUID } = planningCart || {};

    if (products) {
      console.log('LET SEE', products);
      updatedProducts = products.map((product) => {
        const { promotions, retail_price, ...remainingAtts } = product;

        const updatedPromotion = promotions
          .filter(({ start_date, end_date }) => {
            const currentDateTime = new Date().getTime();
            const startDateTime = new Date(start_date).getTime();
            const endDateTime = new Date(end_date).getTime();

            // active promotion
            return (
              currentDateTime >= startDateTime && currentDateTime <= endDateTime
            );
          })
          .map((promotion) => {
            const { promotion_type, meta_data } = promotion;
            let sale_price;
            let promotion_value;

            const isDiscountBasedPromo =
              promotion_type === 'Basic' || promotion_type === 'Bundle';

            if (isDiscountBasedPromo) {
              const {
                meta_data: { discount, discountType },
              } = promotion;
              let saving;

              if (discountType.percentage_off_checked) {
                saving =
                  (parseFloat(discount) / 100) * parseFloat(retail_price);
                promotion_value = `-${discount}%`;
              } else {
                saving = parseFloat(discount);
                promotion_value = `RM${discount} off`;
              }

              sale_price = parseFloat(retail_price) - saving;
            } else {
              const {
                BxGy: { buyQty, freeQty },
              } = meta_data;

              promotion_value = `Buy ${buyQty} Free ${freeQty}`;
            }

            return {
              ...promotion,
              is_active: true,
              sale_price,
              promotion_value,
            };
          });

        return {
          ...remainingAtts,
          retail_price,
          promotions: updatedPromotion,
        };
      });
    }

    planningCartLogger.info(
      `Successfully get products by planning cart with UUID: ${planningCartUUID}`
    );

    res.json(updatedProducts);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving planning cart`);
    next(err);
  }
};
