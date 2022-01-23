const router = require('express').Router();
const planningCartController = require('../controllers/backoffice');
const checkAuth = require('../../../middlewares/checkAuth');

router.get('/cart/:uuid', checkAuth, planningCartController.getProductsByCart);

module.exports = router;
