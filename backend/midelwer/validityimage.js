const multer = require('multer')

const stockage = async (req, res, next)=>{
  multer.diskStorage ( { 
    destination : function  ( req ,  file ,  cb )  { 
         cb( null ,  `${__dirname}/../client/public/image/` ) 
    },
    filename : function  ( req ,  file ,  cb )  { 
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+".jpg"
      cb ( null , uniqueSuffix)
    } 
   })
   next()
}
module.exports = multer({storage: stockage}).single('picture')
