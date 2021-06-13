const router = require('express').Router();
const backofficeUserController = require('../controllers/backoffice');

router.post('/signup/email', backofficeUserController.signup);
router.get(
  '/backoffice-user/:uuid',
  backofficeUserController.findBackofficeUser
);

module.exports = router;
