import React from 'react'
import { faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Confreservaion() {
  return (
      <div className="confresrvaion">
          <div className="confirp-1">
                <div className="confirp">
                    <FontAwesomeIcon icon={faChevronLeft} />
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
                              <p className='date-heur'>10–16 févr.</p>
                          </div>
                          <p className='update'>Modifier</p>
                      </div>
                      <div className="heurerarriver">
                          <div className="heurerarriver-1">
                              <p className='heur-a'>Heure d'arrivée</p>
                              <p className='date-heur'>10–16 févr.</p>
                          </div>
                          <p className='update'>Modifier</p>
                      </div>
                  </div>
                  <div className="connectreservation">
                      <h1>Connectez-vous ou inscrivez-vous pour réserver</h1>
                      <div className="orderpay">
                          <div className="pays">
                              <div className="pay-1">
                                  <div className="pay-2">pays/Region</div>
                                  <div className="pay-3">Mali</div>
                              </div>
                              <div className="pay-icon"><FontAwesomeIcon icon={faChevronDown}/></div>
                          </div>
                          <div className="numer">
                              zdsfahbhq
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
                          <img src="../image/sauter.png" alt="tamnal" />
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
                          <p>130,00 € x 6 nuits</p>
                          <p>780,00 €</p>
                      </div>
                      <div className="price-frais">
                          <p>Frais de service</p>
                          <p>780,00 €</p>
                      </div>
                      <div className="barre" style={{margin:"10px 0px"}}></div>
                      <div className="total">
                          <p>Total <span>(X)F</span></p>
                          <p>912,14 €</p>
                      </div>
                  </div>
              </div>
        </div>
    </div>
  )
}

export default Confreservaion
