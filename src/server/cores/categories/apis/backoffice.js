const router = require('express').Router();
const categoryController = require('../controllers/backoffice');
// const checkAuth = require('../../../middlewares/checkAuth');

router.get('/category', categoryController.getAllCategory);
// router.get('/item/:uuid', checkAuth, itemController.findItem);

module.exports = router;
