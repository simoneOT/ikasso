import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Profil() {
    const[value, setValue]= useState(false)
  return (
    <div>
       <div className="containerprofil" onClick={()=>setValue(!value)}>
            <img src="./image/defaultimage.png" alt="" />
            <div className="profil">
                <span>Ousmane tapily</span>
            </div>
        </div>
        { value?
            <div className="containerprofil">
                <ul>
                    <li><Link to="/profil">Allez vers mon profil</Link></li>
                    <li to="/signUp"><Link>S'inscrire</Link></li>
                    <li><Link to="/signIn"> Se connecté </Link></li>
                    <li>Se deconnecté</li>
                </ul>
            </div>
            :""
        }
    </div>
  )
}

export default Profil
