const router = require('express').Router();
const campaignController = require('../controllers/mobile');
const checkAuth = require('../../../middlewares/checkAuth');

router.get('/campaigns', checkAuth, campaignController.getAllCampaigns);
router.get('/campaign/:uuid', checkAuth, campaignController.getCampaign);
router.get(
  '/campaign/:uuid/products',
  checkAuth,
  campaignController.getCampaignProducts
);

module.exports = router;
