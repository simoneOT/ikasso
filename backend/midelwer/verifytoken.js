const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const authHendler= req.headers.token
    if (authHendler) {
        const token =  authHendler.split(" ")[1]
        jwt.verify(token, process.env.SECRET_SEC, (err, ConnectUser)=>{
            if (err) res.status(403).json({message:"token n'est pas valide"})
            req.ConnectUser = ConnectUser
            next();
        }) 
    } else {
        return res.status(401).json({message:"Vous n'etes pas connecté"}) 
    }
}
const verifyTokenAndAh=  (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if (req.ConnectUser.id===req.params.id || req.ConnectUser.admin ) {
            req.id = req.ConnectUser.id
            next()
        } else {
            res.status(403).json({message:"Tu n'as pas l'habitude de faire ça"}) 
        }
    })
}
const verifyTokenAndisAdmin=  (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if (req.ConnectUser.admin) {
            next()
        } else {
            res.status(403).json({message:"Tu n'as pas l'habitude de faire ça"}) 
        }
    })
}
module.exports = {verifyToken, verifyTokenAndAh, verifyTokenAndisAdmin}