import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Popup from 'reactjs-popup'
import Image from '../Component/Image'
import { getappartementnames } from '../query/Url'


function Categoriapp() {
  const location = useLocation().pathname.split("/")
  const village = location[2]
  const [dataapp, setDataapp] = useState([].sort())
  useEffect(() => {
    axios.get(`${getappartementnames}`+village)
    .then((res) => {
      setDataapp(res.data)
    })
    .catch((error) => {
      console.log(error);
    })
  },[village])
  return (
    <div className='container_liste categorieapp'>
      { dataapp?
      <div className="wrapper">
        {dataapp.map((appartem, index) => {
        return(
          <Link style={{textDecoration:"none", color:"black"}} to={`/appartement/${appartem.idapp}`} key={index} >
            <div className="Liste" >
              <Image idapp={appartem.idapp}/>
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
      </div>:<Popup/>
       }
    </div>
  )
}

export default Categoriapp
