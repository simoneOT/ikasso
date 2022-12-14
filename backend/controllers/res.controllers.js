const pool = require("../config/db");
const query = require("./queries")
const moment = require('moment')
moment().format();

const reserver= ( req, res)=>{
    const idapp_ch = parseInt(req.params.id)
    const{dateEntrer, dateSortie}= req.body
    if (idapp_ch && req.id) {
        pool.query(query.selet_reserver, [idapp_ch, dateEntrer, dateSortie ], (error, reponse)=>{
            if (error) {
                return res.status(500).json(error)
            } else {
                console.log(reponse.rows.length);
                if (reponse.rows.length) {  
                        res.status(401).json({message:"appartement en court de reservation"}) 
                } else{
                    pool.query(query.inserReservation, [idapp_ch, req.id, dateEntrer, dateSortie], 
                        (err, repo)=>{
                            if (err) {
                                return res.status(500).json(err)
                            } else{
                                return res.status(200).json({message:"appartement reservé avec succès"})
                            }
                        }) 
                }
                } 
            }
        ) 
    } else {
        return res.status(401).json({message:"choisis un appartement pour reserveer"})
    }
}

const AllReservation = (req, res)=>{
    const reservation = true
    pool.query(query.getReservation, [reservation], (error, reponse)=>{
        if (error) {
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

module.exports={reserver, AllReservation, updateReservation}