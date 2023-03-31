const route = require('express').Router()
const AppChcontrollers = require("../controllers/res.controllers")
const verifyToken = require("../middleware/verifyToken")


route.get('/', AppChcontrollers.AllReservation)
route.post("/reservation/:id", AppChcontrollers.reserver)
route.delete("/delete/:id", AppChcontrollers.deleteReservation )
route.patch('/update/:id',verifyToken.verifyTokenAndisAdmin, AppChcontrollers.updateReservation)


module.exports=route