const router = require('express').Router();
const campaignController = require('../controllers/backoffice');
const checkAuth = require('../../../middlewares/checkAuth');
const { upload } = require('../../../middlewares/multer');

router.get(
  '/campaigns/:store_uuid',
  checkAuth,
  campaignController.getAllCampaigns
);
router.get('/campaign/:uuid', checkAuth, campaignController.findCampaign);
router.post(
  '/campaign',
  checkAuth,
  upload.single('adsBanner'),
  campaignController.addCampaign
);
router.put(
  '/campaign/:uuid',
  checkAuth,
  upload.single('adsBanner'),
  campaignController.editCampaign
);
router.delete('/campaign/:uuid', checkAuth, campaignController.removeCampaign);
router.post(
  '/campaign/delete',
  checkAuth,
  campaignController.removeMultipleCampaign
);

module.exports = router;
