
import { faEye, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getappartements } from '../../../query/Url'
import AddImage from './AddImage'
import PupopUpdate from './PupopUpdate'

function Addappartement() {
    const [appartement, setAppartement] = useState([])
     useEffect(()=>{
       const getAppartemenAnduser = async () => {
            try {
                const res = await axios.get(`${getappartements}`)
                setAppartement(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getAppartemenAnduser()
     }, [])
    const HundalDelete = (appart) => {
        if (window.confirm("Voulez-vous vraiment supprimer l'appartement ?")) {
            axios.delete(`${getappartements}`+appart.idapp)
                .then((res) => {
                     setAppartement(appartement.filter((app)=>app.idapp!==appart.idapp) )
                     window.confirm(`${res.data.message}`)
            })
                .catch((error) => {
                    if (error.response.data.message === "Appartement est en cours de réservation!") {
                        window.confirm(`${ error.response.data.message}`)
                    } else {
                        return""
                    }
            })
}
        
    }
    return (
    <main>
      <div className="body-case" style={{backgroundColor:"white"}}>
            <div className="tableau">
                <table style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <td>Numéro</td>
                            <td>Adress</td>
                            <td>Rue</td>
                            <td>Porte</td>
                            <td>Prix</td>
                            <td>date d'ajout</td>
                            <td>Description</td>
                            <td>images</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                        <tbody>
                            {
                                appartement.map((appartement, index) => (
                                    <tr key={index} className={`appartement${index}`}>    
                                        <td style={{padding:"10px",fontSize:"20px", color:"rgb(42, 65, 165)", fontWeight:"600"}}>{index+1}</td>
                                        <td>{appartement.ville_app_ch}</td>
                                        <td>{appartement.rue_app_ch}</td>
                                        <td>{appartement.porte_app_ch}</td>
                                        <td>{appartement.prix}</td>
                                        <td>{moment(appartement.dateajout).format('L')}</td>
                                        <td>{appartement.description_ch.length >= 20 ? `${appartement.description_ch.slice(0, 20)}...` : appartement.description_ch.slice(0, 20)} </td>
                                        <td className='folder-image'><AddImage idapp={appartement.idapp} index={index + 1} /></td>
                                        <td><Link to={`/admin/appartement/${appartement.idapp}`} className='view'><FontAwesomeIcon icon={faEye} /></Link></td>
                                        <td className='update'><PupopUpdate Idappartement={appartement.idapp} number={index+1} /></td>
                                        <td className='delete'><FontAwesomeIcon onClick={(e) => {
                                             e.preventDefault()
                                            HundalDelete(appartement)
                                        }} icon={faTrashCan} /></td>
                                    </tr>         
                                   ))
                            }
                    </tbody>
                  </table>
            </div>
            </div>
            <div className="addappartement">
                <div className="add">
                   <NavLink to="/admin/appartement/post"><span style={{ fontSize: "1.5rem", marginRight: "5px" }}>add<FontAwesomeIcon icon={faPlus} /></span></NavLink> 
                </div>
            </div>
            <div className="errReservation"></div>
    </main>
  )
}

export default Addappartement
