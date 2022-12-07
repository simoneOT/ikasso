const express = require("express")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/user.routes")
const app_chRoute = require("./routes/app_ch.route")
require('dotenv').config({path: './config/.env'})
const app = express()

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//user
app.use('/api/user', userRoutes )
//api appartement et chambres
app.use('/api/app_ch', app_chRoute )

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`connecter avec succès sur le port${process.env.PORT?process.env.PORT:5000}`);
})