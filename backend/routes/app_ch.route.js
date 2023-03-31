const route = require('express').Router()
const AppChcontrollers = require("../controllers/app_ch")
const verifyToken = require("../middleware/verifyToken")
const controlimage = require('../controllers/controlimage')
const validityimage = require('../middleware/validityimage')
const {counterImage} = require('../middleware/counterImage')
const Updatevalidityimage = require('../middleware/Updatevalidityimage')

// routes des appartement et chambre
//appartement
route.get("/",  AppChcontrollers.getAppartement)
route.get("/:id", AppChcontrollers.getOneAppartement)
route.get("/getAppartementofuser/userAppartement/", verifyToken.verifyTokenAndAh, AppChcontrollers.getappa_user)
route.get("/getappartementnames/namesappartement/namesapp/",AppChcontrollers.getappartementnames)
route.get("/getappartementnames/namesappartement/namesapp/:nameapp",AppChcontrollers.getdataappartementnames)
route.post("/inserteApparteOrchambre",  AppChcontrollers.InsertAppartement)
route.patch("/updateappartement/:id",  AppChcontrollers.updateAppartement)
route.delete("/:id", AppChcontrollers.deleteapparte_ch)
//image de l'appartement
route.get("/getAppartement/Appartement/display/allimage/images/", controlimage.getAllImage)
route.get("/getAppartement/Appartement/display/:idapp", controlimage.displayImage)
route.post("/postimage/images/:idapp", counterImage, validityimage, controlimage.controlimage )
route.patch("/postimage/images/updateImage/:id", controlimage.displayImage )
module.exports = route