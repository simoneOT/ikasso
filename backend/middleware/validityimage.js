const multer = require('multer')
const maxSize = 1*1000*1000

const storage =   multer.diskStorage ( {
  destination : function  ( req ,  file ,  cb )  { 
       cb( null ,  `${__dirname}/../client/public/images/`) 
  },
  filename : function  ( req ,  file ,  cb )  { 
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+".jpg"
    req.uniqueSuffix= uniqueSuffix
    cb ( null , uniqueSuffix)
  },
 })
module.exports = multer({ storage: storage,
  fileFilter: (req, file, cb)=>{
    if (req.counterImage===7) {
      req.imageValidationError = "Au maximum  7 images";
      return cb(req.fileValidationError);
  }
    if (file.size > maxSize) {
      req.imageValidationError = "Image size can't exceed 2MB";
      return cb(req.fileValidationError);
    }
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp") {
        cb(null, true);
    } else {
        req.imageValidationError = "Unsupported Image Type";
        return cb(req.fileValidationError);
    }
    }
}).single('picture')
