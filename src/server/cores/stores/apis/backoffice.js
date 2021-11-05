const router = require('express').Router();
const storeController = require('../controllers/backoffice');
const checkAuth = require('../../../middlewares/checkAuth');

router.get('/stores', checkAuth, storeController.getAllStores);
router.get('/store/user/:uuid', checkAuth, storeController.findStore);
router.get('/store/url/:url', storeController.findStoreByUrl);
router.post('/store', storeController.createStore);
router.put('/store/:uuid', checkAuth, storeController.editStore);
router.delete('/store/:uuid', checkAuth, storeController.removeStore);

module.exports = router;
