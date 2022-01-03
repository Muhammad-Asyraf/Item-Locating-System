const router = require('express').Router();
const campaignController = require('../controllers/backoffice');
const checkAuth = require('../../../middlewares/checkAuth');

router.get(
  '/campaigns/:store_uuid',
  checkAuth,
  campaignController.getAllCampaigns
);
// router.get('/product/:uuid', checkAuth, campaignController.findPromotion);
// router.post(
//   '/product',
//   checkAuth,
//   upload.array('imgCollection', 12),
//   campaignController.createPromotion
// );
// router.post(
//   '/product/multiple',
//   checkAuth,
//   campaignController.createMultiplePromotions
// );
// router.post(
//   '/product/mapping',
//   checkAuth,
//   campaignController.savePromotionMapping
// );
// router.post(
//   '/product/delete',
//   checkAuth,
//   campaignController.removeMultiplePromotion
// );
// router.put(
//   '/product/:uuid',
//   checkAuth,
//   upload.array('imgCollection', 12),
//   campaignController.editPromotion
// );
// router.patch(
//   '/product/multiple',
//   checkAuth,
//   campaignController.patchMultiplePromotion
// );
// router.patch('/product/:uuid', checkAuth, campaignController.patchPromotion);
// router.delete('/product/:uuid', checkAuth, campaignController.removePromotion);

module.exports = router;
