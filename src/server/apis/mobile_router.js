const router = require('express').Router();
const customerService = require('../cores/customers/api/mobile');

router.use('/customer-service', customerService);

module.exports = router;
