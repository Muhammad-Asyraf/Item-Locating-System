const router = require('express').Router();
const backofficeUserService = require('../cores/backoffice_users/apis/backoffice');
const itemService = require('../cores/items/apis/backoffice');
const productService = require('../cores/products/apis/backoffice');
const storeService = require('../cores/stores/apis/backoffice');

router.use('/backoffice-user-service', backofficeUserService);
router.use('/item-service', itemService);
router.use('/product-service', productService);
router.use('/store-service', storeService);

module.exports = router;
