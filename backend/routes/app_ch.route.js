const route = require('express').Router()
const AppChcontrollers = require("../controllers/app_ch")
const verifyToken = require("../VerifyToken/verifyToken")

// routes des appartement et chambre
route.get("/",  AppChcontrollers.getAppartement)
route.get("/:id", AppChcontrollers.getOneAppartement)
route.post("/", verifyToken.verifyTokenAndAh, AppChcontrollers.InsertAppartement)
route.patch("/:id", verifyToken.verifyTokenAndAh,  AppChcontrollers.updateAppartement)
route.delete("/:idappart_ch", verifyToken.verifyTokenAndisAdmin, AppChcontrollers.deleteapparte_ch)
module.exports = route