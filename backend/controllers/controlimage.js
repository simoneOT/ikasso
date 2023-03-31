
const pool = require("../config/db.config");
const query = require("../controllers/queries")


const controlimage = async (req, res)=>{
  try {
    if (req.imageValidationError) {
      res.status(401).json({message:req.imageValidationError})
    } else {
      const id = req.params.idapp
      const file = req.file!== null ? "/images/"+`${req.uniqueSuffix}`:"" 
      pool.query(query.imageAppartement, [id, file])
      .then(()=>{
        res.status(200).json({message:"Image de l'appartemet ajouté avec succè"})
      })
      .catch((error)=>{
        res.status(500).json(error)
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
const UpdateImages = (req, res) => {
  const id = parseInt(req.body.id)
  const idapp = parseInt(req.params.idapp)
  if (idapp && id ) {
    pool.query(query.select_image_appOne, [idapp, id ])
      .then((response) => {
      
        //     pool.query(query.updatdeImage, [idapp, req.uniqueSuffix])
        //       .then((resp) => {
        //         res.status(200).json({message:"Image de l'appartement modifié avec succès"})
        //       })
        // .catch((error)=>console.log(error))
      })
      .catch((error) => {
        res.status(500).json(error)
    })
  }
}
const displayImage = (req, res)=>{
  const idapp = parseInt(req.params.idapp)
  if (idapp) {
    pool.query(query.select_image_app,[idapp])
      .then((reponse) => {
      res.status(200).json(reponse.rows)
    })
    .catch((error)=>res.status(500).json(error))
  } 
}
const getOneImage = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query(query.select_image_app, [id])
    .then((response) => {
      res.status(200).json(response.rows)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}
const getAllImage = (req, res) => {
  pool.query(query.getAllImage)
    .then((response) => {
      res.status(200).json(response.rows)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}
module.exports = {controlimage, displayImage, UpdateImages,getOneImage, getAllImage }
