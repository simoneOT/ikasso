
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
        res.status(200).json({message:"image de l'appartemet avec succè"})
      })
      .catch((error)=>{
        res.status(500).json(error)
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
const displayImage = (req, res)=>{
  const idapp = parseInt(req.params.idapp)
  if (idapp) {
    pool.query(query.select_image_app,[idapp])
    .then((reponse)=>{
      res.status(200).json(reponse.rows)
    })
    .catch((error)=>res.status(500).json(error))
  } 
}
module.exports = {controlimage, displayImage }
