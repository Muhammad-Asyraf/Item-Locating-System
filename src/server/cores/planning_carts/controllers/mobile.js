const { v4: uuidv4 } = require('uuid');
const PlanningCart = require('../model');
const AppUser = require('../../app_users/model');
const Product = require('../../products/model');
const getLogger = require('../../../utils/logger');

const planningCartLogger = getLogger(__filename, 'auth');

// Get default planning cart by app_user_uuid, else create one
// TODO: improve on the temporary solution
exports.getDefaultCart = async (req, res, next) => {
  try {
    const { app_user_uuid } = req.params;
    let planningCarts = await AppUser.relatedQuery('planning_carts')
      .for(app_user_uuid)
      .where('is_default', true)
      .withGraphFetched('products.[stores,promotions,images]')
      .modifyGraph('products.promotions', (builder) => {
        builder.select('start_date', 'end_date', 'promotion_type', 'meta_data');
      })
      .modifyGraph('products.images', (builder) => {
        builder.select('path');
      });

    if (planningCarts.length !== 0) {
      planningCartLogger.info(
        `Successfully retrieved default planningCart for user ${app_user_uuid}: ${planningCarts.length} carts`
      );
    } else {
      // EMPTY:: Create a new default cart
      planningCartLogger.info(
        `No default cart found for user ${app_user_uuid}, creating a new default cart...`
      );
      planningCarts = await AppUser.relatedQuery('planning_carts')
        .for(app_user_uuid)
        .insert({
          uuid: uuidv4(),
          app_user_uuid,
          name: `${app_user_uuid} default`,
          is_default: true,
        });
      planningCarts = await AppUser.relatedQuery('planning_carts')
        .for(app_user_uuid)
        .where('is_default', true)
        .withGraphFetched('products.[stores,promotions]')
        .modifyGraph('products.promotions', (builder) => {
          builder.select(
            'start_date',
            'end_date',
            'promotion_type',
            'meta_data'
          );
        })
        .modifyGraph('products.images', (builder) => {
          builder.select('path');
        });
      planningCartLogger.info(
        `Successfully created default planningCart for user ${app_user_uuid}: ${planningCarts.length} carts`
      );
    }

    const updatedCarts = planningCarts.map((store) => {
      const { products, ...cartAttrs } = store;

      const updatedProducts = products.map((product) => {
        const { promotions, retail_price, ...remainingAtts } = product;

        const updatedPromotion = promotions.map((promotion) => {
          const { start_date, end_date, promotion_type, meta_data } = promotion;
          let sale_price;
          let display_name;

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
              saving = (parseFloat(discount) / 100) * parseFloat(retail_price);
              display_name = `${discount}% off`;
            } else {
              saving = parseFloat(discount);
              display_name = `${discount} off`;
            }

            sale_price = parseFloat(retail_price) - saving;
          } else {
            display_name = `Buy ${meta_data?.BxGy.buyQty} Get ${meta_data?.BxGy.freeQty}`;
          }

          return {
            ...promotion,
            promotion_status,
            sale_price,
            display_name,
          };
        });

        return {
          ...remainingAtts,
          retail_price,
          promotions: updatedPromotion,
        };
      });

      return {
        ...cartAttrs,
        products: updatedProducts,
      };
    });

    res.json(updatedCarts[0]);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving all planningCarts`);
    next(err);
  }
};

// Get planning cart by cart UUID
exports.getCart = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const { store } = req.query;
    const planningCarts = await PlanningCart.query()
      .where({ uuid })
      .withGraphFetched('products.[stores,promotions,images]')
      .modifyGraph('products', (builder) => {
        if (store && store !== '') {
          builder.where('store_uuid', store);
        }
      })
      .modifyGraph('products.promotions', (builder) => {
        builder.select('start_date', 'end_date', 'promotion_type', 'meta_data');
      })
      .modifyGraph('products.images', (builder) => {
        builder.select('path');
      });

    const updatedCarts = planningCarts.map((store) => {
      const { products, ...cartAttrs } = store;

      const updatedProducts = products.map((product) => {
        const { promotions, retail_price, ...remainingAtts } = product;

        const updatedPromotion = promotions.map((promotion) => {
          const { start_date, end_date, promotion_type, meta_data } = promotion;
          let sale_price;
          let display_name;

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
              saving = (parseFloat(discount) / 100) * parseFloat(retail_price);
              display_name = `${discount}% off`;
            } else {
              saving = parseFloat(discount);
              display_name = `${discount} off`;
            }

            sale_price = parseFloat(retail_price) - saving;
          } else {
            display_name = `Buy ${meta_data?.BxGy.buyQty} Get ${meta_data?.BxGy.freeQty}`;
          }

          return {
            ...promotion,
            promotion_status,
            sale_price,
            display_name,
          };
        });

        return {
          ...remainingAtts,
          retail_price,
          promotions: updatedPromotion,
        };
      });

      return {
        ...cartAttrs,
        products: updatedProducts,
      };
    });

    planningCartLogger.info(`Successfully get planning cart ${uuid}`);

    res.json(updatedCarts[0]);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving planning cart`);
    next(err);
  }
};

// Get all planning carts by app_user_uuid
exports.getAllCarts = async (req, res, next) => {
  try {
    const { app_user_uuid } = req.params;
    const planningCarts = await PlanningCart.query()
      .where({ app_user_uuid })
      .withGraphFetched('products.[stores,promotions,images]')
      .modifyGraph('products.promotions', (builder) => {
        builder.select('start_date', 'end_date', 'promotion_type', 'meta_data');
      })
      .modifyGraph('products.images', (builder) => {
        builder.select('path');
      });

    const updatedCarts = planningCarts.map((store) => {
      const { products, ...cartAttrs } = store;

      const updatedProducts = products.map((product) => {
        const { promotions, retail_price, ...remainingAtts } = product;

        const updatedPromotion = promotions.map((promotion) => {
          const { start_date, end_date, promotion_type, meta_data } = promotion;
          let sale_price;
          let display_name;

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
              saving = (parseFloat(discount) / 100) * parseFloat(retail_price);
              display_name = `${discount}% off`;
            } else {
              saving = parseFloat(discount);
              display_name = `${discount} off`;
            }

            sale_price = parseFloat(retail_price) - saving;
          } else {
            display_name = `Buy ${meta_data?.BxGy.buyQty} Get ${meta_data?.BxGy.freeQty}`;
          }

          return {
            ...promotion,
            promotion_status,
            sale_price,
            display_name,
          };
        });

        return {
          ...remainingAtts,
          retail_price,
          promotions: updatedPromotion,
        };
      });

      return {
        ...cartAttrs,
        products: updatedProducts,
      };
    });

    planningCartLogger.info(
      `Successfully retrieved planningCarts for user ${app_user_uuid}: ${updatedCarts.length} carts`
    );

    res.json(updatedCarts);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving all planningCarts`);
    next(err);
  }
};

// Create new planning cart
exports.createNewCart = async (req, res, next) => {
  try {
    const { app_user_uuid, name } = req.body;
    const planningCarts = await AppUser.relatedQuery('planning_carts')
      .for(app_user_uuid)
      .insert({
        uuid: uuidv4(),
        app_user_uuid,
        name,
        is_default: false,
      });

    planningCartLogger.info(
      `Successfully created planningCart for user ${app_user_uuid}: ${planningCarts.length} cart`
    );

    res.json(planningCarts);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving all planningCarts`);
    next(err);
  }
};

// Modify planning cart (rename)
exports.modifyCart = async (req, res, next) => {
  try {
    const { app_user_uuid, cart_uuid, name } = req.body;
    const planningCarts = await AppUser.relatedQuery('planning_carts')
      .for(app_user_uuid)
      .patch({
        name,
      })
      .where({
        uuid: cart_uuid,
        is_default: false,
      });
    planningCartLogger.info(
      `Successfully changed planningCart name for user ${app_user_uuid}`
    );

    res.json(planningCarts);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving all planningCarts`);
    next(err);
  }
};

// Delete planning cart
exports.deleteCart = async (req, res, next) => {
  try {
    const { app_user_uuid, cart_uuid } = req.body;
    const planningCarts = await AppUser.relatedQuery('planning_carts')
      .for(app_user_uuid)
      .delete()
      .where({ uuid: cart_uuid });
    planningCartLogger.info(
      `Successfully deleted planningCart ${cart_uuid} for user ${app_user_uuid}`
    );

    res.json(planningCarts);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving all planningCarts`);
    next(err);
  }
};

// Save default planning cart as
exports.saveDefaultCartAs = async (req, res, next) => {
  try {
    const { app_user_uuid, cart_uuid, name } = req.body;
    const planningCarts = await AppUser.relatedQuery('planning_carts')
      .for(app_user_uuid)
      .patch({
        name,
        is_default: false,
      })
      .where({ uuid: cart_uuid });
    planningCartLogger.info(
      `Successfully saved default planning cart into ${name} for user ${app_user_uuid}`
    );

    res.json(planningCarts);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving all planningCarts`);
    next(err);
  }
};

// Add planning cart item (quantity)
exports.addCartItem = async (req, res, next) => {
  try {
    const { cart_uuid, product_uuid, quantity } = req.body;
    planningCartLogger.info(
      `Adding product ${product_uuid} into cart ${cart_uuid}`
    );
    const select = await Product.query()
      .findById(product_uuid)
      .select('retail_price');

    // Check if the product already exists
    const productCheckQuery = PlanningCart.relatedQuery('products')
      .for(cart_uuid)
      .where('product_uuid', product_uuid);
    const isProductExist =
      (await productCheckQuery.resultSize()) == 0 ? false : true;
    let planningCarts;

    if (isProductExist) {
      let storedQuantityQuery = await productCheckQuery.select('quantity');
      let storedQuantity = storedQuantityQuery[0].quantity;
      console.log(`storedQuantity: ${JSON.stringify(storedQuantity)}`);

      // Update cart item
      planningCarts = await PlanningCart.relatedQuery('products')
        .for(cart_uuid)
        .unrelate()
        .where({ uuid: product_uuid });

      if (quantity !== 0) {
        const select = await Product.query()
          .findById(product_uuid)
          .select('retail_price');

        planningCarts = await PlanningCart.relatedQuery('products')
          .for(cart_uuid)
          .relate({
            uuid: product_uuid,
            quantity: quantity + storedQuantity,
            total_price: (quantity + storedQuantity) * select.retail_price,
          });
      }
    } else {
      planningCarts = await PlanningCart.relatedQuery('products')
        .for(cart_uuid)
        .relate({
          uuid: product_uuid,
          quantity,
          total_price: quantity * select.retail_price,
        });
    }

    res.json(planningCarts);
  } catch (err) {
    planningCartLogger.warn(`Error adding product into cart`);
    next(err);
  }
};

// Remove planning cart item
exports.removeCartItem = async (req, res, next) => {
  try {
    const { cart_uuid, product_uuid } = req.body;
    const planningCarts = await PlanningCart.relatedQuery('products')
      .for(cart_uuid)
      .unrelate()
      .where({ uuid: product_uuid });

    planningCartLogger.info(
      `Successfully modified product ${product_uuid} in cart ${cart_uuid}`
    );

    res.json(planningCarts);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving all planningCarts`);
    next(err);
  }
};

// Update planning cart item
exports.updateCartItem = async (req, res, next) => {
  try {
    const { cart_uuid, product_uuid, quantity } = req.body;
    let planningCarts = await PlanningCart.relatedQuery('products')
      .for(cart_uuid)
      .unrelate()
      .where({ uuid: product_uuid });

    if (quantity !== 0) {
      const select = await Product.query()
        .findById(product_uuid)
        .select('retail_price');

      planningCarts = await PlanningCart.relatedQuery('products')
        .for(cart_uuid)
        .relate({
          uuid: product_uuid,
          quantity,
          total_price: quantity * select.retail_price,
        });
    }

    planningCartLogger.info(
      `Successfully modified product ${product_uuid} in cart ${cart_uuid}`
    );

    res.json(planningCarts);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving all planningCarts`);
    next(err);
  }
};
