const path = require('path');
const multer = require('multer');
const STORAGE = process.env.STORAGE;


const storage = multer.diskStorage({
  destination: function (req, file , cb) {
    cb(null, `${STORAGE}/images/products`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + path.extname(file.originalname));
  }
});

module.exports = multer({
  storage: storage,
  limits: {
    // allow 5 MB size
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      req.fileValidationError = 'Only images are allowed';
      return callback(null, false, new Error('Only images are allowed'))
    }
    callback(null, true)
  },
}).single('productImage');
