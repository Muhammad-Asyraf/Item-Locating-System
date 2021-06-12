const router = require('express').Router();
const backofficeUserController = require('../controllers/backoffice');

router.post('/signup/email', backofficeUserController.signup);

module.exports = router;
