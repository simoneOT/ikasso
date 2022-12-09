const route = require('express').Router()
const AppChcontrollers = require("../controllers/app_ch")
const verifyToken = require("../midelwer/verifyToken")

// routes des appartement et chambre
route.get("/",  AppChcontrollers.getAppartement)
route.get("/:id", AppChcontrollers.getOneAppartement)
route.get("/getAppartementofuser/userAppartement", verifyToken.verifyTokenAndAh, AppChcontrollers.getappa_user)
route.post("/inserteApparteOrchambre", verifyToken.verifyTokenAndAh, AppChcontrollers.InsertAppartement)
route.patch("/updateappartement/:id", verifyToken.verifyTokenAndAh,  AppChcontrollers.updateAppartement)
route.delete("/:id", verifyToken.verifyTokenAndisAdmin, AppChcontrollers.deleteapparte_ch)
module.exports = route