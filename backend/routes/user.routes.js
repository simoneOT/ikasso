const route = require('express').Router()
const AppChcontrollers = require("../controllers/user.controllers")
const upload = require('../middleware/upload')
const verifyToken = require("../middleware/verifyToken")


route.get("/",  AppChcontrollers.getAllUsers)
route.get("/:id", AppChcontrollers.getOneUser)
route.post("/",  AppChcontrollers.signup)
route.post("/login",  AppChcontrollers.signIn)
route.patch("/updatepassword/:id", AppChcontrollers.updatepassword)
route.patch("/biographie/:id", verifyToken.verifyTokenAndAh,  AppChcontrollers.biographie)
route.patch("/uploidprofile/:id", verifyToken.verifyTokenAndAh, upload, AppChcontrollers.uploadeProfile)
module.exports = route