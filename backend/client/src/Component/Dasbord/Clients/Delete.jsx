import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import Popup from 'reactjs-popup'
import { user } from '../../../query/Url'

function Delete({ users, setUsers, userId }) {
  let [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("")
  const [value, setValue] = useState(false)
  const override: CSSProperties = {
      display: "block",
      margin: "0 auto",
      borderColor: "rgb(42, 65, 165)",
  };
  const HundalDelete = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.delete(`${user}deleteUser/` + userId)
      .then((res) => {
         if (res.data.message) {
          setLoading(false)
          setUsers(users.filter((user)=>user.id!==userId))
          setMessage(res.data.message)
          setValue(true)
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
    })
  }

  return (
    <Popup trigger={<FontAwesomeIcon icon={faTrashCan}/>
            } modal position={['top center']} closeOnDocumentClick keepTooltipInside=".tooltipBoundary"
            contentStyle={{maxHeight:"30%", maxWidth:"50%"}}>
      {
        close => (
          <div className="content-delete">
            <div className="confirm-delete">
              <div className="confirm-message">
                <ClipLoader
                  loading={loading}
                  cssOverride={override}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                {
                  value ? <>
                    <p>{message}</p>
                  </>
                    : <>
                      <p className='confirm-message1'>Voulez-vous vraiment supprimer l'utilisateur ?</p>
                    </>
                }
              </div>
              <div className="confirm-bnt">
                {
                  value ?
                    <div className="button-confirm">
                      <button onClick={close}>OK</button>
                    </div> :
                    <div className="button-confirm">
                      <button className='' onClick={close}>
                        Annuler
                      </button>
                      <button onClick={HundalDelete}>Oui</button>
                    </div>
                }
                
              </div>
            </div>
          </div>
        )
      }
    </Popup>
  )
}

export default Delete
