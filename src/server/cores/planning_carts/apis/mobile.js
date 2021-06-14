const router = require('express').Router();
const planningCartController = require('../controllers/mobile');

// Get default planning cart by app_user_uuid, else create one
router.get('/cart/:uuid',planningCartController.getDefaultCart)

// Create new planning cart
router.post('/cart/create', planningCartController.createNewCart)

// Modify planning cart (rename)
router.put('/cart/update', planningCartController.modifyCart)

// Modify planning cart item (quantity)
router.put('/cart/update/:uuid', planningCartController.modifyCartItem)

// Delete planning cart
//router.delete('/cart', planningCartController.deleteCart)

// Save planning cart as
//router.post('/cart',planningCartController.saveCartAs)

// Get all planning carts by app_user_uuid
router.get('/carts',planningCartController.getAllCarts)

module.exports = router;
