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
router.get('/promotion/:uuid', checkAuth, promotionController.findPromotion);
router.post(
  '/promotion',
  checkAuth,
  upload.fields([]),
  promotionController.createPromotion
);
router.delete(
  '/promotion/:uuid',
  checkAuth,
  promotionController.removePromotion
);
router.post(
  '/promotion/delete',
  checkAuth,
  promotionController.removeMultiplePromotion
);
router.put(
  '/promotion/:uuid',
  checkAuth,
  upload.fields([]),
  promotionController.editPromotion
);
// router.patch(
//   '/product/multiple',
//   checkAuth,
//   promotionController.patchMultiplePromotion
// );
// router.patch('/product/:uuid', checkAuth, promotionController.patchPromotion);

module.exports = router;
