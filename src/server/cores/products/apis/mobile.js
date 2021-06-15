const router = require('express').Router();
const productController = require('../controllers/mobile');

router.get('/products', productController.searchProducts);

module.exports = router;