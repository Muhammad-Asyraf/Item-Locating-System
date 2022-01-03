const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path').resolve('./');

const img_dir = path + '/public/uploaded_images/';
const layout_dir = path + '/public/uploaded_layout/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const {
      body: { multer_type },
    } = req;

    switch (multer_type) {
      case 'layout':
        cb(null, layout_dir);
        break;
      case 'image':
        cb(null, img_dir);
        break;
      default:
      // code block
    }
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  },
});

var upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   if (
  //     file.mimetype == 'image/png' ||
  //     file.mimetype == 'image/jpg' ||
  //     file.mimetype == 'image/jpeg'
  //   ) {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  //   }
  // },
});

module.exports = {
  upload,
};
