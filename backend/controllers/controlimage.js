const multer = require('multer')
const fs = require('fs')
const{promisify}=require('util')
const pool = require('../config/db')
const query = require("../controllers/queries")
const pepiline = promisify(require('stream').pipeline)


module.exports.controlimage = async (req, res)=>{
try {
  if (req.file.mimetype !=='image/jpeg' &&
  req.file.mimetype !=='image/jpg' &&
  req.file.mimetype !=='image/png') throw res.status(404).json({messa:"image not found"})
  if (req.file.size> 500000 ) throw res.status(404).json({messa:"la taille de l'image ne depasse pas 500000k"})
} catch (error) {
  res.status(500).json(error)
}
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+".jpg"
  await
    fs.createWriteStream(
      `${__dirname}/../client/public/images/${uniqueSuffix}`
    )
    try {
      const id = req.params.idapp
      const file = req.file!== null ? "./images/"+`${uniqueSuffix}`+".jpg":"" 
      pool.query(query.select_image_app, [id])
      .then((reponse)=>{
        if (reponse.rows.length<=8) {
          pool.query(query.imageAppartement,[id, file])
          .then(()=>{
            pool.query(query.select_image_app, [id])
            .then((reponse)=>{
              res.status(200).json(reponse.rows)
            })
            .catch((err)=> res.status(500).json(err))
          })
          .catch(()=>{
            res.status(500).json(err)
          })
        } else {
          res.status(401).json({message:"les images ne doivent pas deppassées 8"})
        }
      })
      .catch((err)=>{
        res.status(500).json(err)
      })
    } catch (error) {
      res.status(500).json(error)
    }
}
module.exports.displayImage = (req, res)=>{
  const idapp = req.params.idapp
  if (idapp) {
    pool.query(query.select_image_app,[idapp])
    .then((reponse)=>{
      res.status(500).json(reponse.rows)
    })
    .catch((error)=>res.status(500).json(error))
  } 
}
