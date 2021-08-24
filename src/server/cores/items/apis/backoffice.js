const router = require('express').Router();
const itemController = require('../controllers/backoffice');
const checkAuth = require('../../../middlewares/checkAuth');

router.get('/items', checkAuth, itemController.getAllItems);
router.get('/item/:uuid', checkAuth, itemController.findItem);
router.post('/item', checkAuth, itemController.createItem);
router.post('/item/delete', checkAuth, itemController.removeMultipleItem);
router.put('/item/:uuid', checkAuth, itemController.editItem);
router.delete('/item/:uuid', checkAuth, itemController.removeItem);

module.exports = router;
