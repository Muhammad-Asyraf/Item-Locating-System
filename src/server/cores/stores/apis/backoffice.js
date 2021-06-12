const router = require('express').Router();
const storeController = require('../controllers/backoffice');

router.get('/stores', storeController.getAllStores);
router.get('/store/:uuid', storeController.findStore);
router.post('/store', storeController.createStore);
router.put('/store/:uuid', storeController.editStore);
router.delete('/store/:uuid', storeController.removeStore);

module.exports = router;
