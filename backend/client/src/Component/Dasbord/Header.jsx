import React from 'react'

function Header() {
  return (
    <header>
        <div>
            <p><label htmlFor="menu"><span className="fa fa-bars"></span> </label>
            <span className="acceil">Accueil</span></p>
        </div>
        <div className="search-wrap">
            <span className="fa fa-search"></span>
            <input type="search" placeholder="Rechercher"/>
        </div>
        <div id="drpdaown" className="user-wrap">
            <div className="">
                <h3 style={{marginRight:"10px"}}>Ousmane</h3>
                <small>Admin</small>
            </div>
            <img src="./image/img/image.jpg" alt='profil' className="logo-admin" style={{width: "30px", height: "30px", borderRadius: "50px"}}/>
            <div className="drownp-content">
                <p>Profile</p>
                <p>Deconnexion</p>
            </div>
        </div>
    </header>
  )
}

export default Header
