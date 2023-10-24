const path = require ("path");
const multer = require ("multer");
const uuid = require ("uuid");

/* MULTER IMAGE UPLOADER */
function getTargetImageStorage(address) {
  return multer.diskStorage({
    destination: function(req, res, cb){
      cb(null, "./uploads/products");
    },
    filename: function(req, file, cb) {
      console.log(file);
      const extention = path.parse(file.originalname).ext;
      const random_name = uuid.v4() + extention;
      cb(null, random_name);
    },
  });
}

const makeUploader = (address) => {
  const storage = getTargetImageStorage(address);
  return multer({storage: storage});
}

/* const product_storage = multer.diskStorage({
  destination: function(req, res, cb){
    cb(null, "./uploads/products");
  },
  filename: function(req, file, cb) {
    console.log(file);
    const extention = path.parse(file.originalname).ext;
    const random_name = uuid.v4() + extention;
    cb(null, random_name);
  },
}); */
module.exports = makeUploader;