const router = require('express').Router();
const planningCartController = require('../controllers/mobile');
const checkAuth = require('../../../middlewares/checkAuth');

// Get default planning cart by app_user_uuid, else create one
router.get('/cart/default/:app_user_uuid', checkAuth, planningCartController.getDefaultCart)

// Get planning cart by cart UUID
router.get('/cart/:uuid', checkAuth, planningCartController.getCart)

// Create new planning cart
router.post('/cart/create', checkAuth, planningCartController.createNewCart)

// Modify planning cart (rename)
router.patch('/cart/update', checkAuth, planningCartController.modifyCart)

// Delete planning cart
router.delete('/cart/delete', checkAuth, planningCartController.deleteCart)

// Save planning cart as
router.patch('/cart/save', checkAuth, planningCartController.saveDefaultCartAs)

// Get all planning carts by app_user_uuid
router.get('/carts/:app_user_uuid', checkAuth, planningCartController.getAllCarts)

// Planning cart item
// Add item
router.post('/cart/items/add', checkAuth, planningCartController.addCartItem)

// Remove planning cart item
router.delete('/cart/items/remove', checkAuth, planningCartController.removeCartItem)

// Update planning cart item
router.post('/cart/items/update', checkAuth, planningCartController.updateCartItem)

module.exports = router;
