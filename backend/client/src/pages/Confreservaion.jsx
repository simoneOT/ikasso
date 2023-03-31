import React, { useRef, useState } from 'react'
import {  faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import { Link,  useLocation } from 'react-router-dom';
import moment from 'moment';
import Popupdate from '../Component/pupop/popupdate';
import { accountservice } from '../Component/Log/accountservice';
import axios from 'axios';
import { reserver } from '../query/Url';
import { Uidcontext } from '../Component/Log/Appcontext';
import ClipLoader from 'react-spinners/ClipLoader';


function Confreservaion() {
    const [number, setNumber] = useState("")
    const ContinuerRef = useRef()
    const idappartement = useLocation().pathname.split("/")[2]
    const datareservation = useSelector(state => state.dateRedux)
    let [loading, setLoading] = useState(false);
    const override: CSSProperties = {
      display: "block",
      margin: "0px auto",
      borderColor: "white",
    };
    const [reservation, setReservation]=useState("")
    const userId = parseInt(localStorage.getItem("uid"))
    let nuberday = accountservice.acountday(datareservation)
    const Moths=["Janv", "févr", "mars", "avri", "mai", "juin", "juil", "août", "sept", "oct", "nov", "déc"]
    const moientrer= moment(datareservation.date.dateenrer).format('L').split("/")
    const moisorie = moment(datareservation.date.datesortie).format('L').split("/")
    let datereservation = moientrer[0] !== moisorie[0] ? <p>{moientrer[1]} {Moths[moientrer[0] - 1]}-{moisorie[1]}{"  "}{Moths[moisorie[0] - 1]}</p> : <p>{moientrer[1]}-{moisorie[1]}{"  "}{Moths[moisorie[0]]}</p>
    const numervalue = document.querySelector(".numer")
    numervalue?.addEventListener('click', () => {
        const numervalue = document.querySelector(".numer")
        const controllnumer = document.querySelector(".controllnumer")
        const cars = document.getElementById("cars").value
        ContinuerRef.current.focus()
        document.querySelector(".numer-1").style = "display:block;  display: flex;"
        numervalue.style = "margin-top:0px"
        controllnumer.innerHTML = cars
    })

    const Hundalreservation = (e) => {
        e.preventDefault()
         setLoading(true)
        const dateReservation = new Date()
        const errorNumber = document.querySelector(".errorNumber")
        const numer3 = document.querySelector(".numer-3 input")
        const succes = document.querySelector(".succes")
        const controllnumer = document.querySelector(".controllnumer")
        document.querySelector(".numer-1").style = "display:block;  display: flex;"
        errorNumber.innerHTML = ""
        succes.textContent=""
        controllnumer.innerHTML = document.getElementById("cars").value
        ContinuerRef.current.focus()
        if (number === "") {
            setLoading(false)
            numer3.style= "border-bottom:0.5px solid red !important;"
            errorNumber.innerHTML = "Entrer votre numéro pour reserver l'appartement"
            
        } else if (number.length < 8 || !number.toString) {
            numer3.style="border-bottom:0.5px solid green !important";
            setLoading(false)
             errorNumber.innerHTML = "Le numéro de téléphone est incorrect"
        } else {
            axios.post(`${reserver}/reservation/${idappartement}`, {
                userId, dateEntrer:moment(datareservation.date.dateenrer).format("YYYY-MM-DD") ,
                dateSortie:moment(datareservation.date.datesortie).format("YYYY-MM-DD"),
                datereservation: moment(dateReservation).format("YYYY-MM-DD"),
                frais: datareservation.reservation.frais, fraisService: datareservation.reservation.fraisService,
                total: datareservation.reservation.total, telephone: number
            })
                .then((res) => {
                    succes.textContent = res.data.message
                    setLoading(false)
                    setReservation(res.data)
            })
                .catch((error) => {
                    succes.textContent=""
                    const errorNumber = document.querySelector(".errorNumber")
                    if (error) {
                        errorNumber.textContent=error.response.data.message
                        setLoading(false)
                    }
                    console.log(error)
                })
            
        }
    }
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
                          <div className='update'><Popupdate/></div>
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
                              <div className="numer-1" style={{cursor:"pointer"}}>
                                  <div className="numer-2">
                                      <p className='controllnumer'></p>
                                  </div>
                                  <div className="numer-3">
                                      <input type="text" id='number'
                                          ref={ContinuerRef}
                                         onChange={(e)=>setNumber(e.target.value)}
                                          value={number}
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                    <div className="confinfo">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae 
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae 
                    </div>
                    <div className="errorNumber" style={{color:"red", textAlign:"center" }}></div>
                    <div className="succes" style={{color:"green", textAlign:"center" }}></div>
                    <div className="button_reservation"  onClick={Hundalreservation}>
                        <button > <ClipLoader
                                loading={loading}
                                cssOverride={override}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            {loading===false && <p>Validé la reservation</p>}
                        </button>
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
