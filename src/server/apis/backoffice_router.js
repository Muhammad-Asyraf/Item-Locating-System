const router = require('express').Router();
const customerService = require('../cores/customers/api/backoffice');
const merchantService = require('../cores/merchants/api/backoffice');

router.use('/customer-service', customerService);
router.use('/merchant-service', merchantService);

module.exports = router;
