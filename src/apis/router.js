const router = require('express').Router();
const cors = require('cors');

router.use(cors());
router.use('/backoffice', require('./backoffice.router'));
router.use('/mobile', require('./mobile.router'));

module.exports = router;
