const router = require('express').Router();
const promotionController = require('../controllers/backoffice');
const checkAuth = require('../../../middlewares/checkAuth');

const multer = require('multer');
const upload = multer();

router.get(
  '/promotions/:store_uuid',
  checkAuth,
  promotionController.getAllPromotions
);
// router.get('/product/:uuid', checkAuth, promotionController.findPromotion);
router.post(
  '/promotion',
  checkAuth,
  upload.fields([]),
  promotionController.createPromotion
);
// router.post(
//   '/product/multiple',
//   checkAuth,
//   promotionController.createMultiplePromotions
// );
// router.post(
//   '/product/mapping',
//   checkAuth,
//   promotionController.savePromotionMapping
// );
// router.post(
//   '/product/delete',
//   checkAuth,
//   promotionController.removeMultiplePromotion
// );
// router.put(
//   '/product/:uuid',
//   checkAuth,
//   upload.array('imgCollection', 12),
//   promotionController.editPromotion
// );
// router.patch(
//   '/product/multiple',
//   checkAuth,
//   promotionController.patchMultiplePromotion
// );
// router.patch('/product/:uuid', checkAuth, promotionController.patchPromotion);
// router.delete('/product/:uuid', checkAuth, promotionController.removePromotion);

module.exports = router;
