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
            res.status(500).json(error)})
    }
}
const InsertAppartement = (req, res) => {
    const dateajout = new Date()
    const{adress, rue, porte, prix, quartier, description}=req.body
    pool.query(query.select_appartement_porte_rue, [rue, porte, adress])
        .then((response) => {
            if (response.rows.length) {
                return res.status(401).json({message:"Cet appartement existe déja"})
            } else {
                pool.query(query.InsertAppartemen, [rue, porte, adress, description, prix, quartier, dateajout])
                    .then((response) => {
                        return res.status(200).json({message:"Appartement ajouter avec succès"})
                    })
                    .catch((error) => {
                        return res.status(500).json(error)
                })
                          
            }
        })
        .catch((error) => {
            return res.status(500).json(error)
    })
}
const updateAppartement = (req, res) => {
    const { adress, rue, porte, prix, description } = req.body
    const id = parseInt(req.params.id)
    if (id) {
        pool.query(query.select_app_ch, [id])
            .then((response) => {
                if (response.rowCount) {
                    pool.query(query.updateAppartement, [id, adress, rue, porte, prix, description])
                        .then((response) => {
                            res.status(200).json({message:"Appartement modifier avec succès"}) 
                        })
                        .catch((err) => {
                            res.status(500).json(err)
                        })
               } 
            })
            .catch((error)=>res.status(500).json(error))
    } 
}
const deleteapparte_ch = (req, res)=>{
    const id = parseInt(req.params.id)
    pool.query(query.get0neReservation, [id])
    .then((reponse) => {
        if (reponse.rowCount) {
            res.status(401).json({ message: "Appartement est en cours de réservation!" })
        } else {
            pool.query(query.Dlete_appartement, [id])
                .then(() => {
                    res.status(200).json({message: "Appartement Supprimer avec succès"})
                })
                .catch((err) => {
                    res.status(500).json(err)
                })
        }     
    })
    .catch((error)=>{
        res.status(500).json(error)
    })
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