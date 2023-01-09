import React from 'react'
import '../style/navbar.css'
import Profil from '../pages/Profil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


function Navbar() {
  return (
    <div className='container'>
        <div className="container-wrapper">
            <div className="logo">Logo</div>
            <div className="wrapper">
                <div className="contenerSearch">
                    <div className=" dateentrer">Date entrée </div>
                    <div className="space"></div>
                    <div className=" datesorie">Date de sortie</div>
                    <div className="space"></div>
                    <div className=" nombreplace">Nombre de place</div>
                    <div className=" iconsearch">
                        <div className="search">
                        <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>
                </div>
            </div>
            <Profil/>
        </div>
    </div>
  )
}

export default Navbar
