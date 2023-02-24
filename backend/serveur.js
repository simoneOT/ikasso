const express = require("express")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/user.routes")
const app_chRoute = require("./routes/app_ch.route")
const Reservation = require("./routes/reservation.route")
const cookieParser = require("cookie-parser");
require('dotenv').config({path: './.env'})
const cors = require('cors')
const app = express()

const corsOPtion = {
   origin: true,
    credential: true,
    "proxy": "http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
}

// bodyParser
//app.use('images', express.static(__dirname+'/client/public/images'));
app.use(cors(corsOPtion))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//user
app.use('/api/user', userRoutes )
//api appartement et chambres
app.use('/api/app_ch', app_chRoute )
// reserver
app.use('/api/reservation', Reservation)
app.use((error, req, res, next) => {
    console.log(error);
    if (error.code==="LIMIT_FILE_SIZE") {
        res.status(400).json({message:"la taille de l'imge ne dépasse pas 2MB"})
    }
})
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`connecter avec succès sur le port${process.env.PORT?process.env.PORT:5000}`);
})