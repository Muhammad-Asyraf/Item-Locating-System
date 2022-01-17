const router = require('express').Router();
const productController = require('../controllers/mobile');
const checkAuth = require('../../../middlewares/checkAuth');

router.get('/products', checkAuth, productController.searchProducts);
router.get('/categories', checkAuth, productController.getCategories);
router.get(
  '/categories/:category_uuid',
  checkAuth,
  productController.getSubCategories
);

module.exports = router;
