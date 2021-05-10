const router = require('express').Router();
const customerController = require('./customers.bo.controllers');

router.get('/customers', customerController.getAllCustomers);
router.post('/customers', customerController.register);

module.exports = router;
