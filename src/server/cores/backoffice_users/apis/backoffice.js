const router = require('express').Router();
const backofficeUserController = require('../controllers/backoffice');

router.post('/signup/email', backofficeUserController.signup);
router.get('/user/id/:uuid', backofficeUserController.findBackofficeUser);
router.get(
  '/user/email/:email',
  backofficeUserController.findBackofficeUserByEmail
);

module.exports = router;
