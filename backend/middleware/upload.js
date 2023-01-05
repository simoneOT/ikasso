const multer = require('multer')

const  stockage  =  multer.diskStorage ( { 
    destination : function  ( req ,  file ,  cb )  { 
         cb( null ,  `${__dirname}/../client/public/uploads/post/` ) 
    },
    filename : function  ( req ,  file ,  cb )  {
        const fild = file.originalname+".jpg"
        console.log("fild",fild);
       cb ( null , fild )
    } 
  })

  module.exports = multer({storage: stockage}).single('file')

