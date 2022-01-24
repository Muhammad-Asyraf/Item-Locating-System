const router = require('express').Router();
const storeController = require('../controllers/mobile');
const checkAuth = require('../../../middlewares/checkAuth');

router.get('/stores', checkAuth, storeController.getStores);
router.get('/stores/products', checkAuth, storeController.getStoreProducts);
router.get(
  '/stores/:uuid/campaigns',
  checkAuth,
  storeController.getStoreCampaigns
);

module.exports = router;
