const router = require('express').Router();
const customerService = require('../components/customers/api/backoffice');
const authService = require('../components/auth/api/backoffice');

router.use('/customer-service', customerService);
router.use('/auth-service', authService);

module.exports = router;
