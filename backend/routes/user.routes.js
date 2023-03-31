const route = require('express').Router()
const AppChcontrollers = require("../controllers/user.controllers")
const upload = require('../middleware/upload')


route.get("/",  AppChcontrollers.getAllUsers)
route.get("/:id", AppChcontrollers.getOneUser)
route.post("/",  AppChcontrollers.signup)
route.post("/login",  AppChcontrollers.signIn)
route.patch("/updatepassword/:id", AppChcontrollers.updatepassword)
route.patch("/biographie/:id",   AppChcontrollers.biographie)
route.patch("/uploidprofile/:id", upload, AppChcontrollers.uploadeProfile)
route.delete("/deleteUser/:id", AppChcontrollers.deleteUser)
module.exports = route