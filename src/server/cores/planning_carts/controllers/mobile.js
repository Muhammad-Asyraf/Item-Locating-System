const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const admin = require('../../../firebase');
const PlanningCart = require('../model');
const AppUser = require('../../app_users/model')
const getLogger = require('../../../utils/logger');

const planningCartLogger = getLogger(__filename, 'auth');

// Get default planning cart by app_user_uuid, else create one
exports.getDefaultCart = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    let planningCarts = await AppUser.relatedQuery('planning_carts')
      .for(uuid)
      .where('is_default', true);
    
    if(planningCarts.length != 0){
    planningCartLogger.info(
      `Successfully retrieved default planningCart for user ${uuid}: ${planningCarts.length} carts`
    );
    } else {
      // EMPTY:: Create a new default cart
      planningCartLogger.info(
        `No default cart found for user ${uuid}, creating a new default cart...`
      );
      planningCarts = await AppUser.relatedQuery('planning_carts')
      .for(uuid)
      .insert({
        uuid: uuidv4(),
        app_user_uuid: uuid,
        name: uuid + "default",
        is_default: true
      })
      planningCartLogger.info(
        `Successfully created default planningCart for user ${uuid}: ${planningCarts.length} carts`
      );
    }

    res.json(planningCarts);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving all planningCarts`);
    next(err);
  }
};

// Create new planning cart
exports.createNewCart = async (req, res, next) => {
  try {
    const { uuid, name } = req.body;
    // const planningCarts = await AppUser.relatedQuery('planning_carts')
    // .for(uuid)
    // .insert({
    //   uuid: uuidv4(),
    //   name: name,
    //   is_default: false
    // })
    const planningCarts = await PlanningCart.query().insert({
      uuid: uuidv4(),
      app_user_uuid: uuid,
      name,
      is_default: false,
    })

    planningCartLogger.info(
      `Successfully created planningCart for user ${uuid}: ${planningCarts.length} cart`
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
    const { uuid, name } = req.body;
    const planningCarts = await AppUser.relatedQuery('planning_carts').for(uuid)
    .patch({
      name: name
    });
    planningCartLogger.info(
      `Successfully update planningCarts for user ${uuid}`
    );

    res.json(planningCarts);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving all planningCarts`);
    next(err);
  }
};

// Modify planning cart item (quantity)
exports.modifyCartItem = async (req, res, next) => {
  try {
    const { cart_uuid, product_uuid, quantity } = req.body;
    const planningCarts = await AppUser.relatedQuery('planning_carts').for(uuid)
    .patch({
    });
    planningCartLogger.info(
      `Successfully update planningCarts for user ${uuid}`
    );

    res.json(planningCarts);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving all planningCarts`);
    next(err);
  }
};

// Delete planning cart

// Save planning cart as

// Get all planning carts by app_user_uuid
exports.getAllCarts = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const planningCarts = await AppUser.relatedQuery('planning_carts').for(
      uuid
    );
    planningCartLogger.info(
      `Successfully retrieved planningCarts for user ${uuid}: ${planningCarts.length} carts`
    );

    res.json(planningCarts);
  } catch (err) {
    planningCartLogger.warn(`Error retrieving all planningCarts`);
    next(err);
  }
};