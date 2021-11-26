const router = require('express').Router();
const productController = require('../controllers/backoffice');
const checkAuth = require('../../../middlewares/checkAuth');
const { upload } = require('../../../middlewares/multer');

router.get(
  '/products/:store_uuid',
  checkAuth,
  productController.getAllProducts
);
router.get('/product/:uuid', checkAuth, productController.findProduct);
router.post(
  '/product',
  checkAuth,
  upload.array('imgCollection', 12),
  productController.createProduct
);
router.post(
  '/product/delete',
  checkAuth,
  productController.removeMultipleProduct
);
router.put(
  '/product/:uuid',
  checkAuth,
  upload.array('imgCollection', 12),
  productController.editProduct
);
router.patch(
  '/product/multiple',
  checkAuth,
  productController.patchMultipleProduct
);
router.patch('/product/:uuid', checkAuth, productController.patchProduct);
router.delete('/product/:uuid', checkAuth, productController.removeProduct);

module.exports = router;
