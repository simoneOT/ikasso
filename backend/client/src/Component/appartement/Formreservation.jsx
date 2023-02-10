import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import moment from 'moment'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { reserver } from '../../query/Url'
import {accountservice} from '../Log/accountservice'


function Formreservation({ idapp, price }) {
    const [reservation, setReservation] = useState("")
    const date = useSelector(state => state.counter)
  const userId = useSelector(state => state.users)
  const [user, setUser] = useState()
    const [hundaldate, setHundaldate] = useState(null)
    const [currentRadioValue, setCurrentRadioValue] = useState('radio-1')
    const[detail, setDetail]=useState(false)
    const errr_reservation = document.querySelector(".errr_reservation")
    const frais = accountservice.acountday(hundaldate) * price
  const fraisService = accountservice.acountday(hundaldate) * 50
    const total = frais + fraisService
    const Hundalsimut = () => {
        axios.post(`${reserver}` + idapp, { dateEntrer: hundaldate.date.dateentrer, dateSortie: hundaldate.date.datesortie })
            .then((res) => {
                setReservation(res.data)
            })
            .catch(((error) => {
                    console.log(error);
                if (error) {
                   accountservice.islogged() ? errr_reservation.innerHTML="":  errr_reservation.innerHTML= error.response.data.message
                }
            }))
    }
    const handleRadioChange = (e) => {
    setCurrentRadioValue(e.target.value);
    };
    useEffect(() => {
      setHundaldate(date)
      userId && setUser(userId)
    }, [date])
  return (
      <div className="container_reservation">
          <div className="wrapper_reservation">
                <div className="prix_comment">
                    <div className="prixday">
                        <p><span>{price} FCFA</span> par nuit</p>
                    </div>
                </div>
                <div className="formreservation">
                    <div className="dtentrereservation">
                      <p>DEPART</p>
                      {
                          hundaldate?.date.datesortie ? <input
                            type="date"
                            id="condition"
                            value={moment(hundaldate.date.datesortie).format('yyyy-MM-DD')}
                            readOnly
                      />:<p>Entrer une date</p>
                      }
                    </div>
                    <div className="desoriereservation">
                      <p>ARRIVEE </p>
                      {
                            hundaldate?.date.dateenrer?<input
                            type="date"
                            id="condition-1"
                            value={moment(hundaldate.date.dateenrer).format('yyyy-MM-DD')}
                            readOnly
                      />:<p>Entrer une date</p>
                    }
                    </div>
              </div>
              <div className="annulation">
                    <h1>Conditions d'annulation de réservation</h1>
                  <div className="conditonannulation">
                        <div className="condition1_condition2">
                            <div className="condition1">
                                <p> 24h Vous-allez perdre 200fcfa de votre frais de réservation</p>
                              <input
                                    id='radio-1'
                                    type="radio"
                                    value="radio-1"
                                    onChange={handleRadioChange}
                                    checked={currentRadioValue ==='radio-1'}
                              />
                            </div>
                            <div className="condition2">
                                <p> 48h Vous-allez perdre 200fcfa de votre frais de réservation</p>
                              <input
                                    id='radio-2'
                                    type="radio"
                                    value="radio-2"
                                    onChange={handleRadioChange}
                                    checked={currentRadioValue ==='radio-2'}/>
                            </div>
                      </div>
                    </div>
              </div>
                <div className="button_reservation" onClick={() => Hundalsimut()}>
                  {accountservice.islogged()?<NavLink to="/confreservation/">Réserver</NavLink>:<p>veillez vous connecter pour</p>}
              </div>
              <div className="errr_reservation"></div>
                <div className="conseil">
                    <p>ipsum voluptatum sed temporibus, maxime quis rerum hic, magni odio?</p>
              </div>
                <div className="flex_date"  onClick={()=>setDetail(!detail)}>
                    <p>Afficher les details de prix <FontAwesomeIcon icon={faChevronDown} /></p>
              </div>
              {
                detail && <div className="prix_frais">
                                <div className="frais">
                                    <p id='frais'>{price}FCFA x {accountservice.acountday(hundaldate) > 1 ?
                                        `${accountservice.acountday(hundaldate)}nuits` : `${accountservice.acountday(hundaldate)}nuit`}</p>
                                    <p>{frais} FCFA</p>
                                </div>
                                <div className="fraisService">
                                    <p id='fraisService'>frais de service</p>
                                    <p>{fraisService} FCFA</p>
                                </div>
                                <div className="barre"></div>  
                                <div className="detail_prix">
                                    <div className="reservetotal">
                                        <p>Total:</p>
                                        <p>{total} FCFA</p>
                                    </div>
                                </div>
                            </div>
              }
            </div>
    </div>
  )
}

export default Formreservation
