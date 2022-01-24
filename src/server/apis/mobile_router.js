const router = require('express').Router();
const appUserService = require('../cores/app_users/apis/mobile');
const planningCartService = require('../cores/planning_carts/apis/mobile');
const productService = require('../cores/products/apis/mobile');
const optimizationService = require('../cores/optimization/apis/mobile');
const storeService = require('../cores/stores/apis/mobile');
const campaignService = require('../cores/marketing_campaigns/apis/mobile');

router.use('/app-user-service', appUserService);
router.use('/planning-cart-service', planningCartService);
router.use('/product-service', productService);
router.use('/optimization-service', optimizationService);
router.use('/store-service', storeService);
router.use('/campaign-service', campaignService);

module.exports = router;
