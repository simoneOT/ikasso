import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { reserver } from '../../../query/Url'
import "../../../style/reservation.css"
import DeleteReservation from './DeleteReservation'
import UpdateRes from './UpdateRes'

function UpdateReservation() {
  const [reservation, setReservation] = useState([])
  useEffect(() => {
    const getReservation = async () => {
      try {
        const res = await axios.get(`${reserver}`)
        setReservation(res.data)
      } catch (error) {
          console.log(error);
      }
    }
    getReservation()
  },[])
  return (
    <>
    <div className="content-reservation" style={{position:"fixed"}}>
      <div className="title_reservation">
          <h1> Liste des réservations</h1>
      </div>
    </div>
    <main>
  <div className="body-case" style={{ backgroundColor:"white"}}>
    <div className="tableau" style={{width: "100%"}}>
      <table style={{width:"100%"}}>
        <thead>
            <tr>
                <td>Numéro</td>
                <td>Nom</td>
                <td>Email</td>
                <td>Téléphone</td>
                <td>Date entrée</td>
                <td>Date sortie</td>
                <td>date de réservation</td>
                <td>Adress de l'appartement</td>
                <td>Prix</td>
            </tr>
        </thead>
          <tbody>
            {
                reservation?.map((reserv, index) =>
                (
                  <tr key={index} >
                    <td style={{padding:"10px",fontSize:"20px", color:"rgb(42, 65, 165)", fontWeight:"600"}}>{index+1}</td>
                    <td>{reserv.nom}</td>
                    <td>{reserv.email}</td>
                    <td>{reserv.telephone}</td>
                    <td>{ moment(reserv.dateentrer).format('L')}</td>
                    <td>{moment(reserv.datesortie).format('L')}</td>
                    <td>{ moment(reserv.dateentrer).format('L')}</td>
                    <td>{reserv.ville_app_ch}</td>
                    <td>{reserv.prix ? `${reserv.prix}FCFA` : "0FCFA"}</td>
                    <td className='delete'><DeleteReservation reservation={reservation} setReservation={setReservation} idReservation={reserv.id} /></td>
                  </tr>
                ))
            }   
        </tbody>
      </table>
    </div>
</div>
</main>
</>
  )
}

export default UpdateReservation
