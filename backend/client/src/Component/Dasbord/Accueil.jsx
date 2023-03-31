import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { appartementOne, reserver, user } from '../../query/Url'
import { accountservice } from '../Log/accountservice'
import { Uidcontext } from '../Log/Appcontext'
import ImageApp from './Appartement/ImageApp'

function Accueil() {
    const uid = useContext(Uidcontext)
    const [appartement, setAppartemen] = useState([])
    const [listapp, setlistApp] = useState(false)
    const [listclient, setListclient] = useState(false)
    const [users, setUsers] = useState([])
    const[reservervations, setReservations] = useState([])
    const [clientsFidels, setClientsFidels] = useState([])
    const [infoclients, setInfoclients] = useState([])
    useEffect(()=>{
       const getAppartemenAnduser = async () => {
            try {
                const res = await axios.get(`${appartementOne}`)
                const res1 = await axios.get(`${user}`)
                const res2 = await axios.get(`${reserver}`)
                setAppartemen(res.data)
                setUsers(res1.data);
                setReservations(res2.data)
            } catch (error) {
                console.log(error);
            }
        }
        getAppartemenAnduser()
    }, [])
    useEffect(() => {
        reservervations.map((reservation) => {
           setClientsFidels(accountservice.clientsReservation(reservervations, reservation.idutili))
        })
    },[reservervations])
    useEffect(() => {
        clientsFidels.map((iduser) => {
            axios.get(`${user}` + iduser)
            .then((res) => {
               setInfoclients(res.data);
            })
            .catch((error)=>console.log(error))
        })
       
    }, [clientsFidels])
  return (
    <main>
            <div className="cards">
                <div className="cards-single">
                    <div style={{width:"100%"}} >
                      <div className='static'>{reservervations.length}</div>
                        <small>{reservervations.length>=2?"Appartements réservés":"Appartement réservé"}</small>
                    </div>
                    <div>
                       <span className="fa fa-shopping-cart"></span>
                    </div>
                </div>
                <div className="cards-single">
                    <div  style={{width:"100%"}}>
                      <div className='static' >{ appartement.length}</div>
                      <small>{ appartement.length>=2?"Appartements":"Appartement"}</small> 
                    </div>
                    <div>
                        <span className="fa-solid fa-newspaper"></span> 
                    </div>
                </div>
                <div className="cards-single">
                    <div  style={{width:"100%"}}>
                        <div className='static'>{users?.length}</div>
                        <small>{users.length>=2?"Clients":"Client"}</small> 
                    </div>
                    <div>
                        <span className="fa fa-outdent"></span> 
                    </div>
                </div>
                <div className="cards-single">
                    <div style={{width:"100%"}}>
                      <div className='static'>{users.length}</div>
                        <small>{users.length>=2?"Clients":"Client"}</small> 
                    </div>
                    <div>
                        <span className="fa fa-outdent"></span> 
                    </div>
                </div>
            </div>
                <div className="composant">
                    <div className="vants">
                        <div className="case">
                            <div className="hearder-case">
                                <h2>Liste des Appartements</h2>
                                <button className="button" onClick={()=>setlistApp(!listapp)}>Voir plus<span className="fa fa-arrow-right"></span> </button>
                            </div>
                            <div className="body-case">
                                <div className="tableau">
                                    <table style={{width: "100%"}}>
                                        <thead>
                                            <tr>
                                                <td>Numéro</td>
                                                <td>Adress</td>
                                                <td>Réservation</td>
                                                <td>Rue</td>
                                                <td>Porte</td>
                                                <td>Description</td>
                                                <td>Prix</td>
                                                <td>Image</td>
                                            </tr>
                                        </thead>
                                  <tbody>
                                      {
                                          appartement.map((appartement, index) =>(
                                              <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{appartement.ville_app_ch}</td>
                                                <td>{appartement.reserver? "Oui":"Non"}</td>
                                                <td>{appartement.porte_app_ch}</td>
                                                <td>{appartement.porte_app_ch}</td>
                                                <td>{appartement.description_ch.length>=20 ? `${appartement.description_ch.slice(0, 20)}...`:appartement.description_ch.slice(0, 20) }</td>
                                                <td>{appartement.prix}</td>
                                                <td><ImageApp idapp={appartement.idapp} /></td>
                                            </tr>
                                          )).slice(0, listapp ?appartement.length:7)
                                      }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="case">
                        <div className="header-case">
                            <h1> clients fidels</h1>
                        </div>
                  <div className="body-case">
                      {
                          infoclients.map((infoclients) => (
                            <div className="all-users">
                                <div className="infos">
                                    <img src={infoclients.profil?infoclients.profil:"../image/defaultimage.png"} alt='fide' style={{width:"30px", height: "30px"}}/>
                                    <div className="nam">
                                        <h3>{infoclients.nom}</h3>
                                    </div>
                                    <div className="user-contact">
                                          <p><FontAwesomeIcon style={{ color:" rgb(42, 65, 165)", margin:"0px 10px"}} icon={ faPhone}/><span>{infoclients.telephone}</span></p>
                                    </div>
                                </div>
                            </div>
                        )).splice(0, listclient ?infoclients.length:7)
                      }
                        </div>
                        <button className="button" onClick={()=>setlistApp(!listclient)} >Voir plus<span className="fa fa-arrow-right"></span> </button>
                    </div>
                </div>
        </main>
  )
}

export default Accueil
