import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ProfilViewform({ setUpdate, usedata}) {
  return (
      <div className="profil-information">
        <div className="profil-information-1">
            <div className="name">
                <strong>Nom:</strong>
                  <p>{usedata[0]?.nom}</p>
            </div>
            <div className="email">
                <strong>Email:</strong>
                <p>{usedata[0]?.email}</p>
            </div>
            <div className="telephone">
                <strong>Numéro de téléphone</strong>
                <p>{usedata[0]?.telephone}</p>
            </div>
            <div className="adress">
                <strong>Adress</strong>
                <p>{usedata[0]?.adresse}</p>
            </div>
          </div>
          <div className="buton"  onClick={()=>setUpdate(true)}>
              <FontAwesomeIcon style={{paddingRight:"5px"}} icon={faPencil}/>
              <button>MODIDFIER MON PROFIL</button>
          </div>
    </div>
  )
}

export default ProfilViewform
