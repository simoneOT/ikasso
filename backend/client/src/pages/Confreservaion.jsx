import React from 'react'
import {  faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import { Link,  useLocation } from 'react-router-dom';
import moment from 'moment';
import Popupdate from '../Component/pupop/popupdate';
import { accountservice } from '../Component/Log/accountservice';


function Confreservaion() {
    const idappartement = useLocation().pathname.split("/")[2]
    const datareservation = useSelector(state => state.dateRedux)
    let nuberday = accountservice.acountday(datareservation)
    const Moths=["Janv", "févr", "mars", "avri", "mai", "juin", "juil", "août", "sept", "oct", "nov", "déc"]
    const moientrer= moment(datareservation.date.dateenrer).format('l').split("/")
    const moisorie = moment(datareservation.date.datesortie).format('l').split("/")
    let datereservation = moientrer[0] !== moisorie[0] ? <p>{moientrer[1]} {Moths[moientrer[0]-1]}-{moisorie[1]}{"  "}{Moths[moisorie[0]-1]}</p> : <p>{moientrer[1]}-{moisorie[1]}{"  "}{Moths[moisorie[0]]}</p>
    const numer = document.querySelector(".numer")
    numer?.addEventListener('click', () => {
        const controllnumer = document.querySelector(".controllnumer")
        const cars = document.getElementById("cars").value
        document.querySelector(".numer-1").style = "display:block;  display: flex;"
        numer.style = "margin-top:0px"
        controllnumer.innerHTML = cars
    })
  return (
      <div className="confresrvaion">
          <div className="confirp-1">
              <div className="confirp">
                  <Link to={"/appartement/"+idappartement} className="inconconfig">
                       <FontAwesomeIcon icon={faChevronLeft}  />
                  </Link>
                    <h1>Confirmer et payer</h1>
                </div>
            </div>
        <div className="confwrapper">
              <div className="confirm">
                  <div className="confpayer">
                      <h1>Votre reservation</h1>
                      <div className="datereservation">
                          <div className="datereservation-1">
                              <p className='date'>Date</p>
                              <p className='date-heur'>{datereservation}.</p>
                          </div>
                          <div className='update'><Popupdate /></div>
                      </div>
                  </div>
                  <div className="connectreservation">
                      <h1>Connectez-vous ou inscrivez-vous pour réserver</h1>
                      <div className="orderpay">
                          <div className="pays">
                              <div className="pay-1">
                                <select name="cars" id="cars" className='cars'>
                                    <option value="+223">Mali(+223)</option>
                                </select>
                              </div>
                          </div>
                          <div className="numer">
                              <div className="numberpay">
                                  <p>Numéro de téléphone</p>
                              </div>
                              <div className="numer-1">
                                  <div className="numer-2">
                                      <p className='controllnumer'></p>
                                  </div>
                                  <div className="numer-3">
                                      <input  type="text" id='number' />
                                  </div>
                              </div>
                          </div>
                      </div>
                    <div className="confinfo">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae 
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae 
                    </div>
                      <div className="button_reservation">
                          <button>Continuer</button>
                      </div>
                  </div>
                  <div className="barre"></div>
              </div>
              <div className="infreservation">
                  <div className="infreservation-img">
                      <div className="img"> 
                          <img src={datareservation.reservation?.image} alt="tamnal" />
                      </div>
                      <div className="info-image">
                          <div className="info-image1">
                              <p>Chambre privée dans : maison d'hôtes</p>
                              <p>Mýrartunga Guesthouse Double bed</p>
                          </div>
                          <div className="info-image2">
                              commentaire
                          </div>
                      </div>
                  </div>
                  <div className="barre"></div>
                  <div className="security">
                      <p>Votre réservation est protégée par IKA So</p>
                       <div className="barre"></div>
                  </div>
                  <div className="detail-price">
                      <h1>Details de prix</h1>
                      <div className="price-day">
                          <p>{datareservation.reservation?.price} FCFA x {nuberday} nuits</p>
                          <p>{datareservation.reservation?.frais} FCFA</p>
                      </div>
                      <div className="price-frais">
                          <p>Frais de service</p>
                          <p>{datareservation.reservation?.fraisService} FCFA</p>
                      </div>
                      <div className="barre" style={{margin:"10px 0px"}}></div>
                      <div className="total">
                          <p>Total <span>(XOF)</span></p>
                          <p>{datareservation.reservation?.total} FCFA</p>
                      </div>
                  </div>
              </div>
        </div>
    </div>
  )
}

export default Confreservaion
