const router = require('express').Router();
const optimizationController = require('../controllers/mobile');
const checkAuth = require('../../../middlewares/checkAuth');

router.get('/path/optimize', optimizationController.getOptimizedPathFromPoints);
router.post(
  '/path/optimize-cart/:cart_uuid',
  optimizationController.getOptimizedPathFromCart
);

module.exports = router;
