const router = require('express').Router();
const appUserController = require('../controllers/mobile');

router.post('/signup/email', appUserController.signup);
router.get('/app-users', appUserController.getAllAppUsers);
router.get('/app-user/:uuid', appUserController.findAppUser);
router.delete('/app-user/:uuid', appUserController.removeAppUser);

module.exports = router;
