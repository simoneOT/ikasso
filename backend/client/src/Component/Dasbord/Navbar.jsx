import { faAdd, faHome, faHouseChimney, faHouseChimneyUser, faLineChart, faUser, faUserGroup} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar-dasbord'>
        <div className="sidebar">
            <div className="sidebard-brand">
                <h1><span  className={faUser}></span>I KA SO </h1>
            </div>
            <div className="sidebar-menu">
                <ul>
                    <li><NavLink to="/admin/accueil"  className={({ isActive }) => (isActive ? "active" : "")}><FontAwesomeIcon icon={faHome} /><span > Accueil</span></NavLink></li>
                    <li><NavLink to="/admin/appartement" className={({ isActive }) => (isActive ? "active" : "")}><FontAwesomeIcon icon={faHouseChimney} /><span >Appartements</span></NavLink></li>
                    <li><NavLink to="/admin/addappartement" className={({ isActive }) => (isActive ? "active" : "")}><FontAwesomeIcon icon={faAdd} /><span >Ajouté un appartement</span></NavLink></li>
                    <li><NavLink to="/admin/appartementreserve" className={({ isActive }) => (isActive ? "active" : "")}><FontAwesomeIcon icon={faHouseChimneyUser} /><span >Appartement réservé</span></NavLink></li>
                    <li><NavLink to="/admin/clients"  className={({ isActive }) => (isActive ? "active" : "")}><FontAwesomeIcon icon={faUserGroup} /><span >Clients</span></NavLink></li>
                    <li><NavLink to="/admin/stastics"  className={({ isActive }) => (isActive ? "active" : "")}><FontAwesomeIcon icon={faLineChart} /><span >Statistique</span></NavLink></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar
