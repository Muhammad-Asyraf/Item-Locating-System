const router = require('express').Router();
const layoutController = require('../controllers/backoffice');
const checkAuth = require('../../../middlewares/checkAuth');
const { upload } = require('../../../middlewares/multer');

router.get('/layouts/:store_uuid', layoutController.getLayouts);
router.get('/layout/:uuid', checkAuth, layoutController.getLayout);
router.post('/layout/delete', checkAuth, layoutController.removeMultipleLayout);
router.delete('/layout/:uuid', checkAuth, layoutController.removeLayout);
router.patch(
  '/layout/multiple',
  checkAuth,
  layoutController.patchMultipleLayout
);
router.patch('/layout/:uuid', checkAuth, layoutController.patchLayout);
router.post(
  '/layout',
  checkAuth,
  upload.single('floorPlanSVG'),
  layoutController.AddLayout
);
// router.put(
//   '/layout/:uuid',
//   checkAuth,
//   upload.array('imgCollection', 6),
//   layoutController.editItem
// );

module.exports = router;
