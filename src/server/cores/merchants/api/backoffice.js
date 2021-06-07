const router = require('express').Router();
const authController = require('../controllers/backoffice');

router.post('/signup/email', authController.signup);

module.exports = router;
