import { faCloudArrowDown, faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import Popup from 'reactjs-popup'
import { OneImageappartement, PostImage } from '../../../query/Url'

function AddImage({ idapp, index}) {
    const [imageapp, setImageapp] = useState("")
    const [image, setImage] = useState("")
    const [viewImage, setViewImage] = useState("")
    let [loading, setLoading] = useState(false);
      const override: CSSProperties = {
      display: "block",
      margin: "0 auto",
      borderColor: "rgb(42, 65, 165)",
  };
    const typeImage = ["image/jpeg","image/jpg", "image/png", "image/svg", "image/jfif", "image/pjpeg","image/pjp", "image/webp", "image/apng", "image/avif", "image/gif", ""]
    const HundalFle = (e) => {
        const type = e.target.files[0].type
        const size = e.target.files[0].size
        const maxeSize = 1 * 1000 * 1000
        const ErrorImage = document.getElementById("errorImage")
        ErrorImage.textContent=""
        if (!typeImage.includes(type) || size > maxeSize) {
            if (!(typeImage.includes(type))) {
                ErrorImage.textContent="les types de l'images sont: png, jpeg, webp, apng, jpg, jfif, pjpeg, pjp "
            } else  {
                 ErrorImage.textContent="La taille de l'image doit etre inferieur ou égale à 1 Mo !"
            }
        } else {
            ErrorImage.textContent=""
            setViewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        }
    }
    const HundalImage = (e) => {
        e.preventDefault()
        const SuccesImage = document.getElementById("succesImage")
        const ErrorImage = document.getElementById("errorImage")
         setLoading(true)
        const data = new FormData()
        data.append('IdApp',  idapp)
        data.append('picture', image)
        if (image) {
            axios.post(`${PostImage}` + idapp, data )
                .then((response) => {
                    setLoading(false)
                    SuccesImage.textContent=response.data.message
                })
                .catch((error) => {
                     setLoading(false)
                    ErrorImage.textContent=error.response.data.message
            })
        } else {
             setLoading(false)
             ErrorImage.textContent="Ajouté une image pour l'appartement pour valider"
        }
    }
    useEffect(() => {
        axios.get(`${OneImageappartement}`+idapp)
        .then((res) => {
            console.log(idapp);
            setImageapp(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    },[idapp])
  return (
    <Popup trigger={
           <FontAwesomeIcon icon={faImages}/>
            } modal position={['top center']} closeOnDocumentClick keepTooltipInside=".tooltipBoundary">
          {
              close => (
                  <>
                      <div id='errorImage' style={{ color: "red" }}></div>
                      <ClipLoader
                      loading={loading}
                      cssOverride={override}
                      size={50}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                        />
                      <div id='succesImage' style={{color:"green"}}></div>
                      <div className="button-app-number-app">
                          <div className="number-app"><span>{imageapp[0]?.images ? <p>Images de l'appartement N°{index}</p> : <p>Ajouté des images pour l'appartement N°{index}</p>}</span></div>
                            <div className="button-app">
                            <button onClick={close}>
                                Annuler
                            </button>
                                <button onClick={HundalImage}>Valider</button>
                            </div>
                        </div>
                        <div className={`content-add-Image ${imageapp[0]?.images || viewImage ?"":"centerIcons"}`}>
                            {
                              imageapp[0].images || viewImage ?
                                    <>
                                        <div className="content-images">
                                            <div className="content-images1" >
                                                {
                                                    imageapp?.map((image, index) => (
                                                        <div className='content-images2' >
                                                            <img src={`${image?.images}`}  alt="images" key={index}  />
                                                        </div>
                                                    ))
                                              }
                                               {
                                                    viewImage &&
                                                    <div className='content-images4' >
                                                        <img src={viewImage}  alt="images"  />
                                                    </div>
                                                }
                                              <div className='content-images3' >
                                                  <label htmlFor="formId">
                                                        < FontAwesomeIcon icon={faCloudArrowDown} />
                                                      <input name="" type="file" id="formId"
                                                          accept='jpeg, jpg, png'
                                                            onChange={HundalFle}
                                                          hidden />
                                                        <p>Ajoué une image</p>
                                                  </label>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </>
                                    : <div className="defaultImage">
                                        <label htmlFor="formId">
                                            <FontAwesomeIcon icon={faCloudArrowDown} />
                                            <input name="" type="file" id="formId"
                                                onChange={HundalFle}
                                                hidden />
                                            <p>Ajouté des images</p>
                                        </label>
                                    </div>
                            }
                        </div>
                    </>
              )
          }
      
    </Popup>
  )
}

export default AddImage
