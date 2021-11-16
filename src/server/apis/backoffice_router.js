const router = require('express').Router();
const backofficeUserService = require('../cores/backoffice_users/apis/backoffice');
const itemService = require('../cores/items/apis/backoffice');
const productService = require('../cores/products/apis/backoffice');
const storeService = require('../cores/stores/apis/backoffice');
const categoryServer = require('../cores/categories/apis/backoffice');
const subCategoryServer = require('../cores/categories/sub_categories/apis/backoffice');

router.use('/backoffice-user-service', backofficeUserService);
router.use('/item-service', itemService);
router.use('/product-service', productService);
router.use('/store-service', storeService);
router.use('/category-service', categoryServer);
router.use('/sub-category-service', subCategoryServer);

module.exports = router;
