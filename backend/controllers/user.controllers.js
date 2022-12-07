const pool = require("../config/db");
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
            res.status(500).json(error)
        } else {
            res.status(200).json(reponse.rows)
        }
    })
}
const getOneUser = (req, res)=>{
    const idUtili = req.params.idUtili  
    pool.query(query.getuser, [idUtili],  (error, reponse)=>{
        if (error) {
            res.status(500).json(error)
        } else {
            if (idUtili) {
                res.status(200).json(reponse.rows)
            } else {
                res.status(401).json({message:"Erreur au niveau du serveur!"})
            }
        }
    })
}
const signup =  (req, res) =>{
    const{nom_prenom, mail, tel, ville, quartier, password, profil}= req.body
    pool.query(query.OneUser,[mail], (error, reponse)=>{
        const mailrows = !reponse.rows.length
        if (error) {
            res.status(500).json(error)
        } else if(!mailrows) {
            res.status(401).json({message: "Ce mail est déja prit"})
        } else{
            const email =  mailValidator.validate(mail)
            if (!email) {
               res.status(401).json({message: "Votre email n'est pas valide!"})
            }  else if (password =="") {
                res.status(401).json({message:"veillez entrer votre mot de passe!"})
            } else if(password.length < 6) {
                res.status(401).json({message:"Le mot de passe doit etre au moins 6 caractère"})
            }else{
                bcrypt.hash(password, 10)
                .then(hash=>{
                    pool.query(query.signup,[nom_prenom, mail, tel, ville, quartier, hash, profil], (err, rep)=>{
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
    const{mail, password}= req.body
    pool.query(query.Login, [mail, password], (error, reponse)=>{
        const user = reponse.rows.length
        if (!user) {
            res.status(401).json({message: "Mot de passe ou nom d'utilisation incorrect"})
        } else {
            reponse.rows.map((user)=>{
               bcrypt.compare(user.password, password )
               .then(()=>{
                const token = createToken(user.id, user.admin )
                    res.cookie('jwt', token, {httpOnly: true, maxAge: Maxage})
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
    const{nom_prenom, mail, tel, ville, quartier, profil}= req.body
    pool.query(query.OneUser, [mail], (error, reponse)=>{
        const usercount = !reponse.rowCount
        if (error) {
            res.status(500).json({error})
        } else {
            if (!usercount) {
                pool.query(query.updateUser, [nom_prenom, mail, tel, ville, quartier, profil], (err, respo)=>{
                   if(err) throw res.status(500).json(err)
                   res.status(500).json({message: "Vous avez modifié votre bio avec succès"})
                } )
            } else{
                res.status(500).json({message:"Votre bio n'est pas modifier"})
            }
        }
    } )
}
// profile 
const uploadeProfile =  (req, res)=>{
    const id = parseInt(req.params.id)
    console.log(id);
    if(!id){
        return res.status(400).send("id n'est pas valide"+req.params.id);
    } else{
        let filename = req.file!== null? "./uploads/"+req.params.id+".jpg":""
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