const router = require('express').Router();
const storeController = require('../controllers/backoffice');

router.get('/stores', storeController.getAllStores);
router.get('/store/user/:uuid', storeController.findStore);
router.get('/store/url/:url', storeController.findStoreByUrl);
router.post('/store', storeController.createStore);
router.put('/store/:uuid', storeController.editStore);
router.delete('/store/:uuid', storeController.removeStore);

module.exports = router;
