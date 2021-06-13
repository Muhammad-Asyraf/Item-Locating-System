const router = require('express').Router();
const appUserService = require('../cores/app_users/apis/mobile');

router.use('/app-user-service', appUserService);

module.exports = router;
