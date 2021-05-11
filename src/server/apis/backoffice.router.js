const router = require('express').Router();
const customerServices = require('../components/customers/backoffice/customers.bo.routes');

router.use('/customer-services', customerServices);

module.exports = router;
