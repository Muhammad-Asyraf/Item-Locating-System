const router = require('express').Router();
const cors = require('cors');

router.use(cors());
router.use('/backoffice', require('./backoffice_router'));
router.use('/mobile', require('./mobile_router'));

module.exports = router;
