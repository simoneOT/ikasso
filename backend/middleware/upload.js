const multer = require('multer')
const maxSize = 1*1000*1000

const stockage = multer.diskStorage({ 
    destination : function  ( req ,  file ,  cb )  { 
        console.log(file);
         cb( null ,  `${__dirname}/../client/public/profil/` ) 
    },
  filename: function (req, file, cb) { 
    const profil = req.params.id+".jpg"
    req.profil= profil
    cb ( null , profil)
  },
})
  module.exports = multer({ storage: stockage,
    fileFilter: (req, file, cb) => {
      console.log(file);
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
}).single('file')
