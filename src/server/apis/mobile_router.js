const router = require('express').Router();
const appUserService = require('../cores/app_users/apis/mobile');
const planningCartService = require('../cores/planning_carts/apis/mobile'); 
const productService = require('../cores/products/apis/mobile');
const optimizationService = require('../cores/optimization/apis/mobile');

router.use('/app-user-service', appUserService);
router.use('/planning-cart-service', planningCartService);
router.use('/product-service', productService);
router.use('/optimization-service', optimizationService);

module.exports = router;
