const pool = require("../config/db.config");
const query = require("./queries")

const reserver= ( req, res)=>{
    const idapp_ch = parseInt(req.params.id)
   
    const { dateEntrer, dateSortie, datereservation, userId, frais, fraisService, total, telephone } = req.body
    if (idapp_ch, userId) {
        pool.query(query.selet_reserver, [idapp_ch, dateSortie])
            .then((response) => {
                if (response.rows.length) {  
                       res.status(401).json({message:"Appartement en court de reservation"}) 
                } else {
                    pool.query(query.inserReservation, [idapp_ch, userId, dateEntrer, dateSortie, datereservation, frais, fraisService, total, telephone])
                        .then((respo) => {
                             res.status(200).json({message:"Appartement reservé avec succès"})
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(500).json(error)
                    })
                }
            })
            .catch((error) => {
                return res.status(500).json(error)
        })
        
    }
}

const AllReservation = (req, res)=>{
    pool.query(query.getReservation, (error, reponse) => {
        if (error) {
            console.log(error);
            res.status(500).json(error)
        } else {
            res.status(200).json(reponse.rows)
        }
    } )
}
const updateReservation = (req, res)=>{
    const id = req.params.id
    const reservation = false
    if (id) {
        pool.query(query.updateReservation, [id, reservation], (error, reponse)=>{
            if (error) {
                res.status(500).json(error)
            } else {
                res.status(200).json({message:"Reservation annulée avec succès"})
            }
        } )
    } else {
        res.status(401).json({message:"Selectionnée une reservation pour annuler"})
    }
    
}
const deleteReservation = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(query.deleteReservation, [id])
        .then((reponse) => {
             res.status(200).json({message:"Réservation supprimer avec succès"})
        })
        .catch((error) => {
            res.status(500).json(error)
    })
}
module.exports={reserver, AllReservation, updateReservation, deleteReservation}