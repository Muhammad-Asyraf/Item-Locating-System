const router = require('express').Router();
const backofficeUserService = require('../cores/backoffice_users/apis/backoffice');
const itemService = require('../cores/items/apis/backoffice');
const productService = require('../cores/products/apis/backoffice');
const storeService = require('../cores/stores/apis/backoffice');
const categoryService = require('../cores/categories/apis/backoffice');
const subCategoryService = require('../cores/categories/sub_categories/apis/backoffice');
const layoutService = require('../cores/layouts/apis/backoffice');

router.use('/backoffice-user-service', backofficeUserService);
router.use('/item-service', itemService);
router.use('/product-service', productService);
router.use('/store-service', storeService);
router.use('/category-service', categoryService);
router.use('/sub-category-service', subCategoryService);
router.use('/layout-service', layoutService);

module.exports = router;
