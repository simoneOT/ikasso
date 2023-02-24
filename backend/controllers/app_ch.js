const pool = require("../config/db.config");
const query = require("./queries")

const getAppartement = (req, res)=>{
    pool.query(query.getAllAppartement, (error, reponse)=>{
        if (error) {
            return res.status(500).json(error)
        } else {
            return res.status(200).json(reponse.rows) 
        }
    })
}
const getOneAppartement = (req, res)=>{
    const id = parseInt(req.params.id)
    if (id) {
        pool.query(query.getOneAppartement, [id])
        .then((reponse)=>{
            res.status(200).json(reponse.rows)
        })
        .catch((error)=> {
            console.log(error);
            res.status(500).json(error)})
    }
}
const InsertAppartement = (req, res)=>{
    const{type_app_ch, ville_app_ch, quartier_app_ch, rue_app_ch, porte_app_ch, description_ch, prix, dateajout, idUtili}=req.body
        pool.query(query.select_appartement_porte_rue, [rue_app_ch, porte_app_ch,  ville_app_ch, quartier_app_ch], (error, reponse)=>{
            if (error) {
                return res.status(500).json(error)
            } else {
                if (reponse.rows.length) {
                    return res.status(401).json({message:"Cet appartement existe déja"})
                } else { 
                    pool.query(query.InsertAppartemen, [type_app_ch, ville_app_ch, quartier_app_ch, rue_app_ch, 
                        porte_app_ch, description_ch, prix, dateajout, idUtili],
                           (er, resp )=>{
                            if (er) {
                                return res.status(500).json(er)
                            } else {
                                return res.status(200).json({message:"Appartement ajouter avec succès"})
                            }
                           }
                        )
                }
            }
        })
}
const updateAppartement = (req, res)=>{
    const{type_app_ch, ville_app_ch, quartier_app_ch, rue_app_ch, porte_app_ch, description_ch, prix}=req.body
    const id = parseInt(req.params.id)
    const idUtili = req.id
    if (id && idUtili) {
        pool.query(query.select_app_ch, [id, idUtili ], (error, reponse)=>{
            if (error) {
                return res.status(500).json(error)
            } else {
               if (reponse.rows.length) {
                pool.query(query.updateAppartement, [id, idUtili,
                    type_app_ch, ville_app_ch, quartier_app_ch,
                     rue_app_ch, porte_app_ch, 
                     description_ch, prix ], (err, resp)=>{
                        if (err) {
                            return res.status(500).json(err)
                        } else {
                            pool.query(query.getdeleteAppartement,[id], (e, r)=>{
                                if (e) {
                                    return res.status(500).json(e)
                                } else {
                                    return res.status(500).json(r.rows)
                                }
                            })
                        }
                } )
               } else {
                    return res.status(401).json({message:"Cet appartement appartient à une autre personne"})
               }
            }
        })
    } else {
        
    }
  
}
const deleteapparte_ch = (req, res)=>{
    const id = parseInt( req.params.id)
    if (id) {
        pool.query(query.Dlete_appartement, [id], (error, reponse)=>{
            if(error)  throw  res.status(200).json(repo)
            res.status(200).json({message: "Appartement Supprimer avec succès"})
        })
    } else {
        return res.status(401).json({message:"veillez selection un appartement"})
    }
}
const getappa_user = (req, res)=>{
    const idUtili = req.id
    if (idUtili) {
        pool.query(query.getappartement_user, [idUtili], (error, reponse)=>{
            if (error) {
                return res.status(500).json(error)
            } else {
                return res.status(200).json(reponse.rows)
            }
        } )
    } else {
        
    }
}

const postimages = (req, res)=>{
    const{ idapp, image }= req.body
    pool.query(query.select_image_app, [idapp])
    .then((reponse)=>{
        if (reponse.rows.length<=8) {
            pool.query(query.imageAppartement, [idapp, image ])
            .then((respo)=>{
                return res.status(200).json(reponse.rows)
            })
            .catch((error) =>{
                return res.status(500).json(error)
            })
        } else {
            return res.status(401).json({message:"Le nombre maximum de photo est 8"})
        }
    })
    .catch((error) =>{
        return res.status(500).json(error)
    })
}
const getappartementnames = (req, res) => {
    pool.query(query.getappartementname)
        .then((reponse) => {
            res.status(200).json(reponse.rows)
        })
        .catch((error) => {
            return res.status(500).json(error)
        })
}
const getdataappartementnames = (req, res) => {
    const nameapp = req.params.nameapp
    pool.query(query.getdataappartementname, [nameapp])
    .then((reponse) => {
            res.status(200).json(reponse.rows)
        })
    .catch((error) => {
            return res.status(500).json(error)
        })
}

module.exports={getAppartement, getOneAppartement, InsertAppartement, updateAppartement, deleteapparte_ch,
    getappa_user, postimages, getappartementnames, getdataappartementnames}