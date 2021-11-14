const router = require('express').Router();
const optimizationController = require("../controllers/mobile");
const checkAuth = require('../../../middlewares/checkAuth');

router.get('/path/optimize',optimizationController.getOptimizedPathFromPoints);

module.exports = router;