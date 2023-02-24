import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Popup from 'reactjs-popup'
import { getappartementnames } from '../../query/Url'
import {NavLink} from 'react-router-dom'

const Popupcherche = () => {
    const [namesapp, setNamesapp] = useState([])
    const Hundalclass = (event ) => {
        console.log(event);
    }
    useEffect(() => {
        axios.get(`${getappartementnames}`)
        .then((res) => {
            setNamesapp(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
  return (
    <div className="tooltipBoundary">
        <Popup trigger={
            <div className='Popupcherche1' >
                <div className=" nombreplace">Chercher un appartement</div>
                <div className=" iconsearch">
                    <div className="search">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
            </div>
            } modal position={['top center', 'bottom right', 'bottom left']} closeOnDocumentClick keepTooltipInside=".tooltipBoundary">
              {
                close => (
                    <div className="nameappartement">
                        <div className="close">
                            <button onClick={close}>
                                &times;
                            </button>
                        </div>
                    <div className="nameappartement-wraper">
                        <ul>
                            {namesapp.map((appartement, index) => {
                                return <li onClick={() => {
                                    close()
                                    Hundalclass()
                                }} key={index}><NavLink to={`/categorieappartement/${appartement.ville_app_ch}`} >{appartement.ville_app_ch}</NavLink></li>
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </Popup>
      </div>
  )
}

export default Popupcherche
