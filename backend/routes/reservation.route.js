const route = require('express').Router()
const AppChcontrollers = require("../controllers/res.controllers")
const verifyToken = require("../midelwer/verifyToken")


route.post("/reserver/:id", verifyToken.verifyTokenAndAh, AppChcontrollers.reserver)
route.get('/', verifyToken.verifyTokenAndisAdmin, AppChcontrollers.AllReservation)
route.patch('/update/:id',verifyToken.verifyTokenAndisAdmin, AppChcontrollers.updateReservation)

module.exports=route