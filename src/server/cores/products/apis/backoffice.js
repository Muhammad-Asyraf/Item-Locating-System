const router = require('express').Router();
const productController = require('../controllers/backoffice');
const checkAuth = require('../../../middlewares/checkAuth');

router.get('/products', checkAuth, productController.getAllProducts);
router.get('/product/:uuid', checkAuth, productController.findProduct);
router.post('/product', checkAuth, productController.createProduct);
router.post(
  '/product/delete',
  checkAuth,
  productController.removeMultipleProduct
);
router.put('/product/:uuid', checkAuth, productController.editProduct);
router.patch('/product/:uuid', checkAuth, productController.patchProduct);
router.delete('/product/:uuid', checkAuth, productController.removeProduct);

module.exports = router;
