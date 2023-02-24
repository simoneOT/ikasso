
import axios from 'axios'
import React,{ useContext, useEffect, useState} from 'react'
import { updatebio, user } from '../../query/Url'
import { Uidcontext } from '../Log/Appcontext'

function Profilform({ setUpdate }) {
    const uid = useContext(Uidcontext)
    const[nom ,setNom]=useState("")
    const[email ,setEmail]=useState("")
    const[ telephone ,setTelephone]=useState("")
    const [adresse, setAdresse] = useState("")
    const [response, setResponse] = useState(null)
    const errorNom = document.querySelector(".name.error")
    const errorEmail = document.querySelector(".email.error")
    const errorTelephone = document.querySelector(".telephone.error")
    const errorAdress = document.querySelector(".adress.error")
    const succes =  document.querySelector(".message.succes")
  const Hundalupdate = () => {
      errorNom.innerHTML=""
      errorEmail.innerHTML=""
      errorTelephone.innerHTML=""
      errorAdress.innerHTML=""
      if (nom==="") {
        errorNom.innerHTML="Le champ nom ne doit pas etre vide"
      }else if(email==="" || !email.split("").includes('@') || !email.split('.').includes('com') ){
        if(email==="" ){
           errorEmail.innerHTML="Le champ mail est vide"
        } else {
          errorEmail.innerHTML="Mail incorrect"
        }
    }  else if (telephone==="" || telephone.length<8) {
        if(telephone==="" ){
            errorTelephone.innerHTML="Le champ numéro de téléphone est vide"
          } else {
            errorTelephone.innerHTML="Le numéro de téléphone est incorrect"
          }
    } else if (adresse==="") {
        errorAdress.innerHTML="Le champ adress est vide"
    } else {
      axios.patch(`${updatebio}` + uid, { nom, email, telephone, adresse })
        .then((res) => {
           succes.innerHTML =res.data.message
           setResponse(res.data);
        })
        .catch((error) => {
           console.log(error);
        })
    }
  }
  useEffect(() => {
     axios.get(`${user}` + uid)
        .then((res) => {
          setNom(res.data[0]?.nom)
          setEmail(res.data[0]?.email)
          setTelephone(res.data[0]?.telephone)
          setAdresse(res.data[0]?.adresse)
        })
        .catch((error) => {
           console.log(error); 
        })
    }, [uid])
  return (
      <div className="profil-information-update">
          <div className="formupdate-profil">
            <form className="profil-information-update-1">
                <div className="name-1">
                  <label htmlFor="name">Nom</label><br />
                    <input type="text" id='name' className='name'
                      value={nom}
                      onChange={(e) => setNom(e.target.value)} />
                    <div id='errorName' className="name error"></div>
          </div>
                <div className="email-1">
                  <label htmlFor="email">Email</label><br />
                    <input type="email" id='email' className='email'
                      value={email}  
                      onChange={(e) => setEmail(e.target.value)} />
                    <div id='errorEmail' className="email error"></div>
                </div>
                <div className="telephone-1">
                  <label htmlFor="telephone">Numéro de téléphone</label><br />
                    <input type="text" id='telephone' className='telephone'
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)} />
                      <div id='errorTelephone' className="telephone error"></div>
                </div>
                <div className="adress-1">
                  <label htmlFor="adress">Adress</label><br />
                    <input type="text" id='adress' className='adress'
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)} />
                    <div id='errorAdress' className="adress error"></div>
                </div>
        </form>
          <div id='succes' className="message succes"></div>
          <div className="btn">
            <button className='button' onClick={Hundalupdate}>MODFIER</button>
            <button className='button-1'  onClick={()=>setUpdate(false)}>CANCEL</button>
          </div>  
        </div>
    </div>
  )
}

export default Profilform
