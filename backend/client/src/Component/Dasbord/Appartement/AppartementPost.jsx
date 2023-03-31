import axios from 'axios';
import React, { useRef, useState } from 'react'
import { UNSAFE_NavigationContext, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { appartementOne } from '../../../query/Url';
import { accountservice } from '../../Log/accountservice';
import AddImage from './AddImage';

function AppartementPost() {
    const refFocus = useRef([])
    const navigate = useNavigate()
    let [loading, setLoading] = useState(false); 
    const [post, setPost] = useState({
        adress:"",
        rue:"",
        porte:"",
        prix: "",
        quartier: "",
        description:""
    })
    const [messagesucces, setMessagesucces] = useState("")
    const override: CSSProperties = {
      display: "block",
      margin: "0 auto",
      borderColor: "rgb(42, 65, 165)",
  };
  const handalchange = (e) => {
    const postClone = {...post}
    postClone[e.target.name] = e.target.value
    setPost(postClone)
    }
    const HundalAddAppartement =  (e) => {
         e.preventDefault()
         setLoading(true)
        const AdressError = document.querySelector('.adress.err')
        const RueError = document.querySelector('.rue.err')
        const QuartierError = document.querySelector('.quartier.err')
        const PorteError = document.querySelector('.porte.err')
        const PrixError = document.querySelector('.prix.err')
        const DescriptionError = document.querySelector('.description.err')
        const MessageSucce = document.querySelector('.message.succes')
        AdressError.innerHTML=""
        RueError.innerHTML=""
        QuartierError.innerHTML=""
        PorteError.innerHTML=""
        PrixError.innerHTML=""
        DescriptionError.innerHTML = ""
      MessageSucce.innerHTML = ""
      if (accountservice.isEmpty(post.adress)) {
              setLoading(false)
              MessageSucce.innerHTML = ""
          AdressError.innerHTML = "Le champ adress  est  vide !"
      }else if (accountservice.isEmpty(post.quartier)) {
        setLoading(false)
        MessageSucce.innerHTML=""
        QuartierError.innerHTML="Le champ quartier est vide !"
      }
      else if (accountservice.isEmpty(post.rue) || post.rue <= 0) {
        setLoading(false)
        MessageSucce.innerHTML = ""
          if ( accountservice.isEmpty(post.rue)) {
              MessageSucce.innerHTML=""
            RueError.innerHTML = "Le champ porte est vide !"
            refFocus.current.current?.focus()
          } else {
            RueError.innerHTML="Numéro du rue de l'appartement incorrect !"
          }
      } else if (accountservice.isEmpty(post.porte) || post.porte <= 0) {
        setLoading(false)
        MessageSucce.innerHTML = ""
        if (accountservice.isEmpty(post.porte)) {
           PorteError.innerHTML="Le champ porte est vide !"
        } else {
           PorteError.innerHTML="Le numéro du porte de l'appartement est incorrect !"
        }
      } else if (accountservice.isEmpty(post.prix) || post.prix <= 0) {
        setLoading(false)
        MessageSucce.innerHTML = ""
        if (accountservice.isEmpty(post.prix)) {
           PrixError.innerHTML="Le champ prix est vide !"
        } else {
           PrixError.innerHTML="Le prix de l'appartement est incorrect !"
        }
      } 
      else if (accountservice.isEmpty(post.description)) {
        setLoading(false)
        MessageSucce.innerHTML=""
        DescriptionError.innerHTML="Le champ description est vide !"
      } else {
          axios.post(`${appartementOne}inserteApparteOrchambre/`, post)
            .then((res) => {
                navigate("/admin/addappartement")
                setMessagesucces(res.data.message);
                setLoading(false)
              })
            .catch((error) => {
              if (error) {
                  navigate("/admin/addappartement")
                  MessageSucce.innerHTML=`${error.response.data.message} !`
                  MessageSucce.style.color="red"
                  setLoading(false)
                }
                console.log(error);
          })
          }
    }
  return (
      <main style={{ paddingTop: "9rem",paddingBottom:"0px" }}>
          <div className="containerApp-update">
            <div className="number-app" style={{textAlign:"center"}}><span>Ajout d'un appartement</span></div>
            <div className='containerApp' >
                <form>
                    <label htmlFor="adress-app">Adress</label>
                    <input type="text" className='adress-app' id='adress-app'
                            placeholder='Entré l adress'
                            name="adress"
                            value={post.adress}
                            onChange={handalchange} 
                        />
                        <div className="adress err"></div>
                        <label htmlFor="adress-app">Quartier</label>
                        <input type="text" className='quartier-app' id='quartier-app' 
                            placeholder='Entré le nom du  quartier'
                            name="quartier"
                            value={post.quartier}
                            onChange={handalchange} 
                        />
                        <div className="quartier err"></div>
                        <div className="content-input-number">
                            <div className="content-rue-app">
                                <label htmlFor="rue-app">Rue</label>
                                <input type="number" className='rue-app' id='rue-app'
                                    value={post.rue}
                                    name="rue"
                                    min={0}
                                    placeholder='Entré le rue'
                                    onChange={handalchange}
                                /><br/>
                                <div className="rue err"></div>
                            </div>
                            <div className="content-porte-app">
                            <label htmlFor="porte-app">Porte</label>
                            <input type="number" className='porte-app' id='porte-app'
                                        name="porte"
                                        value={post.porte}
                                        placeholder='Entré la porte'
                                        min={0}
                                        onChange={handalchange} 
                            /><br/>
                            <div className="porte err"></div> 
                            </div>
                            <div className="-content-prix_app">
                                <label htmlFor="prix_app">Prix</label>
                                <input type="number" className='prix-app' id='prix-app'
                                    minLength={0}
                                    name="prix"
                                    placeholder='Entré le prix'
                                    value={post.prix}
                                    min={0}
                                    onChange={handalchange}  
                                /><br/>
                                <div className="prix err"></div>
                            </div>
                        </div>
                        <label htmlFor="description-app">Description</label>
                        <textarea id="description-app" cols="30" rows="5"
                                    name="description"
                                    placeholder='Entré la description'
                                    value={post.description}
                                    onChange={handalchange}
                            ></textarea><br/>
                        <div className="description err" style={{ margin: "0px" }}></div>
            </form>
              </div>
              <div className="container-button">
                  <div className="container-spiner">
                      <ClipLoader
                            loading={loading}
                            cssOverride={override}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                  </div>
                    <div className="message succes">{messagesucces}</div>
                    <div className="button-app-number-app">
                      <div className="button-app">
                          <div className="addImage">
                                    <p style={{marginRight:"10px"}}>Ajouté une Image</p>
                                    <AddImage/>
                                </div>
                                <button onClick={()=>navigate("/admin/addappartement")}>
                                    Annuler
                                </button>
                                <button onClick={ HundalAddAppartement}>Ajouter</button>
                            </div>
                    </div>
              </div>
        </div>
          
    </main>
  )
}

export default AppartementPost
