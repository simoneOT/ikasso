import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import { appartementOne } from '../../../query/Url';
import { accountservice } from '../../Log/accountservice';

function PupopUpdate({ Idappartement, number }) {
    
  const [adress, setAdress] = useState("") 
  const [rue, setRue]=useState("") 
  const [porte, setPorte]=useState("") 
  const [prix, setPrix]=useState("") 
  const [description, setDescription] = useState("")
  const[appartement, setAppartement] =useState("")
  const [messagesucces, setMessagesucces] = useState("")
  const HundalAppartement = (e) => {
    e.preventDefault()
    const AdressError = document.querySelector('.adress.err')
    const RueError = document.querySelector('.rue.err')
    const PorteError = document.querySelector('.porte.err')
    const PrixError = document.querySelector('.prix.err')
    const DescriptionError = document.querySelector('.description.err')
    const MessageSucce = document.querySelector('.message.succes')
    const updateApp = async () => {
      try {
        let prix1 = appartement[0]?.prix?.toString().length ===undefined ? 0: appartement[0]?.prix?.toString().length
        let prix2 =prix?.toString().length ===undefined ? 0:prix?.toString().length
        const countChar1 = appartement[0]?.ville_app_ch?.length + appartement[0]?.rue_app_ch?.toString().length +
          appartement[0]?.porte_app_ch?.toString().length + prix1 + appartement[0]?.description_ch?.length
        const countChar2 =  adress?.length + rue?.toString().length + porte?.toString().length + prix2+ description?.length
        if (countChar1 === countChar2) {
            AdressError.innerHTML=""
            RueError.innerHTML=""
            PorteError.innerHTML=""
            PrixError.innerHTML=""
            DescriptionError.innerHTML=""
            MessageSucce.innerHTML= "Aucun champ a eu un changement!"
        } else {
            if (accountservice.isEmpty(adress)) {
              AdressError.innerHTML="Le champ adress  est  vide"
            } else if (accountservice.isEmpty(porte)) {
              RueError.innerHTML="Le champ porte est vide"
            }else if (accountservice.isEmpty(porte)) {
              PorteError.innerHTML="Le champ porte est vide"
            } else if (accountservice.isEmpty(prix)) {
              PrixError.innerHTML="Le champ prix est vide"
            }else if (accountservice.isEmpty(description)) {
              DescriptionError.innerHTML="Le champ description est vide"
            } else {
              if (window.confirm("Voulez vous vraiment supprimer l'appartement")) {
                const res = await axios.patch(`${appartementOne}updateappartement/`+Idappartement, { adress, rue, porte, prix, description })
                setMessagesucces(res.data.message);
                MessageSucce.innerHTML= messagesucces
              }
            }
        }
      } catch (error) {
        console.log(error);
      }
    }  
    updateApp()
  }
   useEffect(()=>{
       const getAppartemenAnduser = async () => {
            try {
              const res = await axios.get(`${appartementOne}` + Idappartement)
                setAppartement(res.data)
                setAdress(res.data[0]?.ville_app_ch)
                setRue(res.data[0]?.rue_app_ch)
                setPorte(res.data[0]?.porte_app_ch)
                setPrix(res.data[0]?.prix)
                setDescription(res.data[0]?.description_ch)
            } catch (error) {
                console.log(error);
            }
        }
        getAppartemenAnduser()
    }, [Idappartement])
  return (
      <Popup trigger={
           <FontAwesomeIcon icon={faPenToSquare}/>
            } modal position={['top center']} closeOnDocumentClick keepTooltipInside=".tooltipBoundary">
              {
              close => (
                    <>
                      <div className="button-app-number-app">
                          <div className="number-app"><span>Appartement N°{number}</span></div>
                          <div className="button-app">
                            <button onClick={close}>
                               Annuler
                            </button>
                              <button onClick={ HundalAppartement}>Modifier</button>
                          </div>
                      </div>
                    <div className="containerApp-update">
                        <div className='containerApp'>
                            <form>
                                <label htmlFor="adress-app">Adress</label>
                                  <input type="text" className='adress-app' id='adress-app' 
                                      value={adress || ""}
                                      onChange={(e) =>setAdress(e.target.value)} 
                                  />
                                  <div className="adress err"></div>
                                <label htmlFor="rue-app">Rue</label>
                                  <input type="text" className='rue-app' id='rue-app'
                                       value={rue || ""}
                                      onChange={(e) =>setRue(e.target.value) }
                                  />
                                  <div className="rue err"></div>
                                <label htmlFor="porte-app">Porte</label>
                                  <input type="number" className='porte-app' id='porte-app'
                                      value={porte || ""}
                                      onChange={(e) =>setPorte(e.target.value)} 
                                />
                                <div className="porte err"></div>
                                <label htmlFor="prix_app">Prix</label>
                                  <input type="number" className='prix-app' id='prix-app'
                                      value={prix || ""}
                                      onChange={(e) =>setPrix(e.target.value)}  
                                  />
                                <div className="prix err"></div>
                                <label htmlFor="description-app">Description</label>
                                  <textarea name="" id="" cols="30" rows="3"
                                    value={description || ""}
                                    onChange={(e) =>setDescription(e.target.value)}
                                 ></textarea>
                                <div className="description err" style={{margin:"0px"}}></div>
                                <div className="message succes"></div>
                            </form>
                        </div>
                      </div>
                </>
            )}
        </Popup>
  )
}
export default PupopUpdate
