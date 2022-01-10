const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path').resolve('./');

const ads_dir = path + '/public/uploaded_ads_banner/';
const item_dir = path + '/public/uploaded_item_images/';
const layout_dir = path + '/public/uploaded_layout/';
const product_dir = path + '/public/uploaded_product_images/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const {
      body: { multer_type },
    } = req;

    switch (multer_type) {
      case 'layout':
        cb(null, layout_dir);
        break;
      case 'item':
        cb(null, item_dir);
        break;
      case 'product':
        cb(null, product_dir);
        break;
      case 'ads':
        cb(null, ads_dir);
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
});

module.exports = {
  upload,
};
