const router = require('express').Router();
const itemController = require('../controllers/backoffice');
const checkAuth = require('../../../middlewares/checkAuth');
const { upload } = require('../../../middlewares/multer');

router.get('/items/:store_uuid', itemController.getAllItems);
router.get('/item/:uuid', checkAuth, itemController.findItem);
router.post(
  '/item',
  checkAuth,
  upload.array('imgCollection', 6),
  itemController.createItem
);
router.post('/item/multiple', checkAuth, itemController.createMultipleItems);
router.post('/item/delete', checkAuth, itemController.removeMultipleItem);
router.put(
  '/item/:uuid',
  checkAuth,
  upload.array('imgCollection', 6),
  itemController.editItem
);
router.delete('/item/:uuid', checkAuth, itemController.removeItem);

module.exports = router;
