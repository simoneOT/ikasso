import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import '../style/appartement.css'
import { appartementOne, OneImageappartement} from '../query/Url'
import PropProfil from '../Component/profil/PropProfil'
import ClipLoader from 'react-spinners/ClipLoader'
import Day from '../Component/calandar/Day'
import Formreservation from '../Component/appartement/Formreservation'
import Popupikaso from '../Component/pupop/popupikaso'
import Navbar from '../Component/Navbar'


function Appartement() {
  const[app, setApp]=useState([])
  const [appaImg, setAppImg] = useState([])
  let [loading, setLoading] = useState(false);
  const override: CSSProperties = {
      display: "block",
      margin: "350px auto",
      borderColor: "rgb(42, 65, 165)",
    };
  
  let idapp = useLocation().pathname.split("/")[2]
  useEffect(()=>{
    const getOneAppartement= async()=>{
      try {
        const res = await axios.get(appartementOne+idapp)
        const res1 = await axios.get(OneImageappartement + idapp)
        if (res1 && res) {
          setLoading(true)
          setApp(res.data)
          setAppImg(res1.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getOneAppartement()
  },[idapp])
  return (
    <>
      <Navbar/>
      {
        loading?      
      <div className='container_appartement'>
        <div className="appartements">
          <div className="images">
            <div className="tabnail">
              <img src={appaImg[0]?.images} alt="app" />
            </div>
            <div className="listeImage">
              {
                appaImg?.map((images, index)=>{
                return images?.images !== appaImg[0]?.images ? <img src={images.images} key={index} alt="app" />:""
                })
              }
            </div>
          </div>
          {
              app?.map((appartement, index) => {
              return (
                <div className="wraper_container" key={index}>
                  <div className="information_container">
                    <div className="appartement_info">
                      <div className="containerinfo">
                        <div className="quartier">
                          <p>{appartement.quartier_app_ch}</p>
                        </div>
                        <div className="ville">
                          <p>{appartement.ville_app_ch}</p>
                        </div>
                        <div className="rue">
                          <p>{appartement.rue_app_ch}</p>
                        </div>
                        <div className="porte">
                          <p>{appartement.porte_app_ch}</p>
                        </div>
                        <div className="prix">
                          <p>{appartement.prix} FCFA <span>par nuit</span></p>
                        </div>
                      </div>
                      <PropProfil userId={appartement.idutili}/>
                    </div>
                    <div className="barre"></div>
                    <div className="comentaireikasso">
                      <div className="commentaire1">
                        <FontAwesomeIcon icon={faCircleInfo} />
                        <div className="desc_commenaire1">
                          <h3>Yan est Superhôte</h3>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quos dolor accusantium officia quidem eveniet, tenetur velit fugiat saepe
                            placeat possimus
                            ipsum voluptatum sed temporibus, maxime quis rerum hic, magni odio?
                          </p>
                        </div>
                      </div>
                      <div className="commentaire2">
                        <FontAwesomeIcon icon={faCircleInfo} />
                        <div className="desc_commenair2">
                          <h3>Yan est Superhôte</h3>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quos dolor accusantium officia quidem eveniet, tenetur velit fugiat saepe
                            placeat possimus
                            ipsum voluptatum sed temporibus, maxime quis rerum hic, magni odio?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="barre"></div>
                    <div className="description">
                      <h1>I KA SO</h1>
                      <p>{appartement.description_ch}</p>
                      <span style={{display:"flex", marginTop:"10px"}}>
                          <Popupikaso />
                          <Link to="/" className="retour_accueil">
                            <FontAwesomeIcon icon={faChevronRight} />
                          </Link>
                      </span>
                    </div>
                    <div className="barre"></div>
                    <Day />
                  </div>
                  <div className="formservation">
                    <Formreservation appaImg={appaImg[0]?.images} idapp={idapp} price={appartement.prix}/>
                  </div>
                </div>
              )})
          }
            </div>
          </div>
          
          :
            <ClipLoader
              loading={true}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
      }
      </>
  )
}

export default Appartement
