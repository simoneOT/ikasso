const express = require("express")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/user.routes")
const app_chRoute = require("./routes/app_ch.route")
const Reservation = require("./routes/reservation.route")
require('dotenv').config({path: './.env'})
const cors = require('cors')
const app = express()

const corsOPtion = {
    "origin":  "*",
    credential: true,
    "proxy": "http://localhost:3000",
    'allowedHeaders':['sessionId', 'Content-Type'],
    'exposedHeaders':['sessionId'],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
}

// bodyParser
//app.use('images', express.static(__dirname+'/client/public/images'));
app.use(cors(corsOPtion))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//user
app.use('/api/user', userRoutes )
//api appartement et chambres
app.use('/api/app_ch', app_chRoute )
// reserver
app.use('/api/reservation', Reservation)

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`connecter avec succès sur le port${process.env.PORT?process.env.PORT:5000}`);
})