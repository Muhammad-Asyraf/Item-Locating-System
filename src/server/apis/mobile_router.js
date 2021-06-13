const router = require('express').Router();
const appUserService = require('../cores/app_users/apis/mobile');
const planningCartService = require('../cores/planning_carts/apis/mobile'); 

router.use('/app-user-service', appUserService);
router.use('/planning-cart-service', planningCartService);

module.exports = router;
