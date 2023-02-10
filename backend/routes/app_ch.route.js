const route = require('express').Router()
const AppChcontrollers = require("../controllers/app_ch")
const verifyToken = require("../middleware/verifyToken")
const controlimage = require('../controllers/controlimage')
const validityimage = require('../middleware/validityimage')
const {counterImage} = require('../middleware/counterImage')

// routes des appartement et chambre
//appartement
route.get("/",  AppChcontrollers.getAppartement)
route.get("/:id", AppChcontrollers.getOneAppartement)
route.get("/getAppartementofuser/userAppartement/", verifyToken.verifyTokenAndAh, AppChcontrollers.getappa_user)
route.post("/inserteApparteOrchambre", verifyToken.verifyTokenAndAh, AppChcontrollers.InsertAppartement)
route.patch("/updateappartement/:id", verifyToken.verifyTokenAndAh,  AppChcontrollers.updateAppartement)
route.delete("/:id", verifyToken.verifyTokenAndisAdmin, AppChcontrollers.deleteapparte_ch)
//image de l'appartement
route.get("/getAppartement/Appartement/display/:idapp", controlimage.displayImage)
route.post("/postimage/images/:idapp",verifyToken.verifyTokenAndAh, counterImage, validityimage, controlimage.controlimage )
module.exports = route