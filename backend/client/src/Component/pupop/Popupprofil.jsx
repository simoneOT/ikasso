import { faCamera, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Popup from 'reactjs-popup'
import { user } from '../../query/Url'
import Profilform from '../appartement/Profilform'
import ProfilViewform from '../appartement/ProfilViewform'

function Popupprofil({ uid}) {
  const [update, setUpdate] = useState(false)
  const [file, setFile] = useState()
   
  const [pictureulpoad, setPictureulpoad] = useState(null)
  const [usedata, setUsedata] = useState('')
  const Hundalpicure = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('userId', uid)
    data.append('file', file)
    axios.patch(`${user}uploidprofile/`+uid, data)
    .then((res) => {
      setPictureulpoad(res.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }
  useEffect(() => {
    axios.get(`${user}`+uid)
    .then((res) => {
      setUsedata(res.data)
    })
    .catch((error) => {
    console.log(error);
  })
  }, [uid])
  return (
    <Popup
      trigger={<button className="button">Allez vers mon profil</button>}
      modal
      nested
    >
      {
        close => (
          <div className="updateprofil">
            <div className="updateprofil-1">
              <div className="updateprofil-2">
                <div className="close">
                  <button onClick={close}>
                      &times;
                  </button>
                </div>
                <div className="updateprofil-3">
                  <div className="updateprofil-name">{usedata[0]?.nom}</div>
                  <div className="updateprofil-profil"><img src={ usedata[0]?.profil ? usedata[0]?.profil: "../image/defaultimage.png"} alt="" /></div>
                </div>
              </div>
            </div>
            <div className="updateprofil-4">
              <div className="updateprofil-5">
                <div className="name-updateprofil">
                  <div className='color'></div>
                  <p>Profile</p>
                </div>
                <div className="container-updateprofil">
                  <div className="container-updateprofil-1">
                    <div className="container-updateprofil-2">
                      <div className="updateprofil-image-container">
                        <div className="updateprofil-image">
                          <img src={usedata[0]?.profil ?usedata[0]?.profil : "../image/defaultimage.png"} alt="" />
                          <div className="icon-photo">
                            <FontAwesomeIcon icon={faCamera} />
                          </div>
                        </div>
                        <form onSubmit={Hundalpicure}>
                          <div className="upload" style={{ display: "flex" }}>
                            <div className="">
                              <label htmlFor='file' className='file-upload'>
                                upload photo
                                <FontAwesomeIcon icon={faCloudArrowUp} />
                              </label>
                              <input
                                  type='file'
                                  id='file'
                                  className='file'
                                  accept='.png, .jpg, .svg' name='file'
                                  onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <div className="btn">
                              <input type="submit" value="Envoyer" />
                            </div>
                          </div>
                          </form>
                      </div>
                    </div>
                    {
                      update ? <Profilform setUpdate={setUpdate} />  :
                        <ProfilViewform setUpdate={setUpdate} usedata={usedata} />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </Popup>
  )
}

export default Popupprofil
