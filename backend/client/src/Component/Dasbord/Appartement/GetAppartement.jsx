import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { appartementOne, OneImageappartement } from '../../../query/Url'
import axios from 'axios'
import moment from 'moment/moment'
import ClipLoader from 'react-spinners/ClipLoader'

function GetAppartement() {
     const id = parseInt(useLocation().pathname.split("/")[3])
    const [appartement, setAppartement] = useState([])
    let [loading, setLoading] = useState(true);
     const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "white",
      };
    const [images, setImages] = useState([])
    useEffect(() => {
        const getAppartemet = async() => {
            const res = await axios.get(`${appartementOne}`+id)
            const res1 = await axios.get(`${OneImageappartement}` + id)
            setAppartement(res.data)
            setImages(res1.data)
            if (res1.data && res.data ) {
                setLoading(false)
            }
        }
        getAppartemet()
    },[id])
    return (
        <div className='container'>
            <div className='content-getAppartement1'>
                 <div className="content-reservation" style={{position:"fixed"}}>
                    <div className="title_reservation">
                        <h1 style={{paddingTop: "20px"}}> Appartement</h1>
                    </div>
                </div>
                <div className="wrapper-getAppartement">
                    <ClipLoader
                        loading={loading}
                        cssOverride={override}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <div className="container_frnformation">
                        {
                            appartement?.map((app, index) => {
                                return (
                                <div className="wrapperview" key={index}>
                                    <div className="viewAdress">
                                        <p><span>Adress: </span>{app.ville_app_ch} </p>
                                    </div>
                                    <div className="viewrue">
                                        <p><span>Rue: </span>{app.rue_app_ch} </p>
                                    </div>
                                    <div className="viewporte">
                                        <p><span>Porte: </span>{app.porte_app_ch} </p>
                                    </div>
                                    <div className="viewprix">
                                        <p><span>Prix: </span>{app.prix} <span>FCFA</span> </p>
                                    </div>
                                    <div className="viewdate">
                                        <p><span>Date ajout: </span>{moment(app.dateajout).format('L') } </p>
                                    </div>
                                    <div className="viewdescription">
                                        <p><span>Description: </span>{app.description_ch} </p>
                                    </div>
                                </div>
                                
                            )})
                        }
                    </div>
                    <div className="container_Images">
                        { 
                            images.map((image,index) => (
                                <div className="list_Image" key={index}>
                                    <img src={image.images} alt="appartemenImg" />
                                </div>
                            ))
                            
                        }
                    </div>
                </div>
            </div>
        </div>
  )
}

export default GetAppartement
