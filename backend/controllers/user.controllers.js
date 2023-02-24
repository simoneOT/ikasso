const pool = require("../config/db.config");
const query = require("./queries")
const mailValidator = require("email-validator")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// creation de token
const Maxage = 1*60*60*1000
function createToken(id, admin){
 return jwt.sign({id, admin}, process.env.TOKEN_SECRETE, 
     {expiresIn: Maxage})
}
//user
const getAllUsers = (req, res)=>{
    pool.query(query.getAllUsers, (error, reponse)=>{
        if (error) {
            console.log(error);
            res.status(500).json(error)
        } else {
            res.status(200).json(reponse.rows)
        }
    })
}
const getOneUser = (req, res)=>{
    const id = req.params.id 
    const idUtili = parseInt(id)
    pool.query(query.getuser, [idUtili],  (error, reponse)=>{
        if (error) {
            res.status(500).json(error)
        } else {
            if (idUtili) {
                res.status(200).json(reponse.rows)
            } else {
                res.status(401).json({message:"Pas d'utilisateur"})
            }
        }
    })
}
const signup =  (req, res) =>{
    const{nom, email, telephone, adresse, password, profil}= req.body
     pool.query(query.OneUser, [email], (error, reponse)=>{
        const mailrows = !reponse.rows.length
        if (error) {
            res.status(500).json(error)
        } else if(!mailrows) {
            res.status(401).json({message: "Ce mail est déja prit"})
        } else{
            const mail =  mailValidator.validate(email)
            if (!mail) {
               res.status(401).json({message: "Votre email n'est pas valide!"})
            }  else if (password =="") {
                res.status(401).json({message:"veillez entrer votre mot de passe!"})
            } else if(password.length < 6) {
                res.status(401).json({message:"Le mot de passe doit etre au moins 6 caractère"})
            }else{
                bcrypt.hash(password, 10)
                .then(hash=>{
                    pool.query(query.signup,[nom, email, telephone, adresse, hash], (err, rep)=>{
                        if(err) throw res.status(500).json({error})
                        res.status(200).json({message: "Vous etes inscrit avec succès!"})
                    })
                })
                .catch(error=> res.status(500).json(error))
            }
        }
     } )
}
const signIn= (req, res)=>{
    const{email, password}= req.body
    pool.query(query.Login, [email, password], (error, reponse)=>{
        const user = reponse.rows.length
        if (!user) {
            res.status(401).json({message: "Mot de passe ou nom d'utilisation incorrect"})
        } else {
            reponse.rows.map((user)=>{
               bcrypt.compare(user.password, password )
               .then(()=>{
                const token = createToken(user.id, user.admin )
                    res.cookie('jwt',JSON.stringify(token), {maxAge: Maxage, httpOnly: true})
                    const order = user
                    res.status(200).json({...order, token})
               })
               .catch((error)=>{
                    res.status(500).json(error)
               })
            })
        }

    })
}

const updatepassword =  (req, res)=>{
    const{mail, password}= req.body
    pool.query(query.OneUser,[mail], (error, response)=>{
        const usercount = !response.rowCount
        if (error) {
            res.status(500).json(error)
        }else if(!usercount) {
            bcrypt.hash(password, 10)
            .then((hash)=>{
                pool.query(query.updatepassword, [hash, mail], (err, respo)=>{
                    if(err) throw  res.status(500).json({error})
                    res.status(200).json({message:"Mot de passe modifier avec succès"})
                })
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
        }else{
            res.status(200).json({message:"Votre mail n'est pas correct!"})
        }
    })
}
const biographie = (req, res)=>{
    const { nom, email, telephone, adresse } = req.body
    console.log(nom, email, telephone, adresse);
    const id = parseInt(req.params.id)
    pool.query(query.OneUser, [id])
        .then((reponse) => {
            if (reponse.rows) {
                pool.query(query.updateUser, [nom, email, telephone, adresse])
                    .then(() => {
                        res.status(200).json({message: "profil modifier avec succès"})
                    })
                    .catch((error) => {
                    res.status(500).json(error)
                })
            }else{
                res.status(404).json({message:"Votre bio n'est pas modifier"})
            }
        })
        .catch((error) => {
            res.status(500).json({error})
    })
}
// profile 
const uploadeProfile =  (req, res)=>{
    console.log(req.profil);
    const id = parseInt(req.params.id)
    if(!id){
        return res.status(400).send("id n'est pas valide"+req.params.id);
    } else{
        let filename = id? "./profil/"+id+".jpg":""
        pool.query(query.profile_user, [id, filename], (error, reponse)=>{
            if (error){
                res.status(500).json({error})
            }
            else{
                pool.query(query.getuser,[id], (err, repon)=>{
                    if(err) throw  res.status(500).json({error})
                    res.status(200).json(repon.rows)
                } )
            }
        } )
    }
        
}
module.exports={getAllUsers, getOneUser, signup, signIn, updatepassword, biographie, uploadeProfile}