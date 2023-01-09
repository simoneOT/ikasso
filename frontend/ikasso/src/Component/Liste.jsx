import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../style/liste.css';


function Liste() {
     const[appa, setApp]=useState([])
  useEffect(()=>{
    const getAppartement= async()=>{
      try {
        const res = await axios.get('http://localhost:3000/api/app_ch/')
        setApp(res.data)
      } catch (error) {
        console.log(error) 
      }
    }
    getAppartement()
  },[])
  return (
    <div className="container_liste">
        <div className="title">
            <h1>liste des appartements</h1>
        </div>
        <div className="wrapper">
            {appa.map((appartem)=>{
                console.log(appartem);
            return(
                <Link style={{textDecoration:"none", color:"black"}} to={`/appartement/${appartem.idapp}`} key={appartem.idapp} >
                    <div className="Liste"  >
                        <div className="image">
                            <img src={`${appartem.img}`} alt="" />
                        </div>
                        <div className="localisation">
                            <span>{appartem.quartier_app_ch}, {appartem.ville_app_ch}</span>
                        </div>
                        <div className="date">
                            <span> Ajouter il y'a 2 semaine</span>
                        </div>
                        <div className="reservation">
                            <span>reserver du{}</span>
                        </div>
                        <div className="price">
                            <span>{appartem.prix} fcfa</span> par nuits
                        </div>
                    </div>
                </Link>
            )})}
        </div>
    </div>
  )
}

export default Liste
