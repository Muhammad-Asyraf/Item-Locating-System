const router = require('express').Router();
const productController = require('../controllers/backoffice');

router.get('/products', productController.getAllProducts);
router.get('/product/:uuid', productController.findProduct);
router.post('/product', productController.createProduct);
router.post('/product/delete', productController.removeMultipleProduct);
router.put('/product/:uuid', productController.editProduct);
router.patch('/product/:uuid', productController.patchProduct);
router.delete('/product/:uuid', productController.removeProduct);

module.exports = router;
