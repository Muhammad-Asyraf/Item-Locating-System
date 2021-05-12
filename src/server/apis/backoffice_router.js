const router = require('express').Router();
const customerService = require('../components/customers/api/backoffice');

router.use('/customer-service', customerService);

module.exports = router;
