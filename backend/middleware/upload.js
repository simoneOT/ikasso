const multer = require('multer')

const  stockage  =  multer.diskStorage ( { 
    destination : function  ( req ,  file ,  cb )  { 
        
         cb( null ,  `${__dirname}/../client/public/uploads/` ) 
    },
    filename : function  ( req ,  file ,  cb )  { 
        const fild = req.params.id+".jpg"
        cb ( null , fild )
    } 
  })

  module.exports = multer({storage: stockage}).single('file')
