const router = require('express').Router();
const subCategoryController = require('../controllers/backoffice');
// const checkAuth = require('../../../middlewares/checkAuth');

router.get('/sub-category', subCategoryController.getAllSubCategory);
// router.get('/item/:uuid', checkAuth, itemController.findItem);

module.exports = router;
