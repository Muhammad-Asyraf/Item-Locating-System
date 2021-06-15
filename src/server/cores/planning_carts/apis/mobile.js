const router = require('express').Router();
const planningCartController = require('../controllers/mobile');

// Get default planning cart by app_user_uuid, else create one
router.get('/cart/default/:app_user_uuid',planningCartController.getDefaultCart)

// Get planning cart by cart UUID
router.get('/cart/:uuid',planningCartController.getCart)

// Create new planning cart
router.post('/cart/create', planningCartController.createNewCart)

// Modify planning cart (rename)
router.patch('/cart/update', planningCartController.modifyCart)

// Delete planning cart
router.delete('/cart/delete', planningCartController.deleteCart)

// Save planning cart as
router.patch('/cart/save',planningCartController.saveDefaultCartAs)

// Get all planning carts by app_user_uuid
router.get('/carts/:app_user_uuid',planningCartController.getAllCarts)

// Planning cart item
// Add item
router.post('/cart/items/add', planningCartController.addCartItem)

// Remove planning cart item
router.delete('/cart/items/remove', planningCartController.removeCartItem)

// Update planning cart item
router.post('/cart/items/update', planningCartController.updateCartItem)

module.exports = router;
