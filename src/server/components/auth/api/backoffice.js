const router = require('express').Router();
const authController = require('../controllers/backoffice');

router.post('/login', authController.login);
router.post('/register/email', authController.registration);

module.exports = router;
