const router = require('express').Router();
const itemController = require('../controllers/backoffice');

router.get('/items', itemController.getAllItems);
router.get('/item/:uuid', itemController.findItem);
router.post('/item', itemController.createItem);
router.post('/item/delete', itemController.removeMultipleItem);
router.put('/item/:uuid', itemController.editItem);
router.delete('/item/:uuid', itemController.removeItem);

module.exports = router;
