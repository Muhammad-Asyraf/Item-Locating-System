const router = require('express').Router();
const customerController = require('../controllers/mobile');

router.post('/signup/email', customerController.signup);
router.get('/customers', customerController.getAllCustomers);
router.get('/customer/:uuid', customerController.findCustomer);
router.delete('/customer/:uuid', customerController.removeCustomer);

module.exports = router;
