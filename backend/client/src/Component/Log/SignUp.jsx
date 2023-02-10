import React, { useState,CSSProperties   } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import '../../style/home.css'
import {SignUpUser} from'../../query/Url'
import axios from 'axios'

const SignUp = ({setOpen}) => {
  let [loading, setLoading] = useState(false);
  const[nom, setNom]=useState('')
  const[email, setEmail]=useState('')
  const[telephone, setTelephone]=useState('')
  const[adresse, setAdresse]=useState('')
  const[password, setPassword]=useState('')
  const[confirmpassword, setConfirmpassword]=useState('')
  const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};
const hundalUpdate = async(e)=>{
  e.preventDefault()
  setLoading(true)
  const succes= document.querySelector(".message.succes")
  const Emailerror= document.querySelector(".email.error")
  const Telephoneerror= document.querySelector(".telephone.error")
  const Pasworderror= document.querySelector(".password.error")
  const Confirmpassworderror= document.querySelector(".confirmpassword.error")
  succes.innerHTML=""
  Emailerror.innerHTML=""
  Telephoneerror.innerHTML=""
  Pasworderror.innerHTML=""
  Confirmpassworderror.innerHTML=""
  if(password !==confirmpassword){
    setLoading(false)
    Confirmpassworderror.innerHTML="Les mots de passe ne ce corespondent pas !"
  }else if(telephone.length===8){
    setLoading(false)
    Telephoneerror.innerHTML="numero incorrect !"
  }else{
    await axios.post(`${SignUpUser}`, {nom, email, telephone, adresse, password})
    .then((res)=>{
      if(res){
        setLoading(false)
        loading===false ?succes.innerHTML= "Vous etes inscrit avec succès!":succes.innerHTML= ""
      }
    })
    .catch((err)=>{
      if(err){
        setLoading(false)
        if (err.response.data.message==="Ce mail est déja prit" || err.response.data.message==="Votre email n'est pas valide!") {
          Emailerror.innerHTML= err.response.data.message
        }else if(err.response.data.message==="veillez entrer votre mot de passe!"|| err.response.data.message==="Le mot de passe doit etre au moins 6 caractère"){
          Pasworderror.innerHTML= err.response.data.message
        }
      }
    })
 }
}
  return (
    <div className="popup" id='openform' >
      <div className="content_form">
        <div className="form">
          <form className="container_form"  onSubmit={hundalUpdate}>
              <h1>S'inscrire</h1>
            <label htmlFor="nom">Nom Complet</label>
            <input type="text" className='nom'  id='nom' required
              value={nom || ''}
              onChange={(e)=>setNom(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input type="email" className='email'  id='email' required
              value={ email || '' }
              onChange={(e)=>setEmail(e.target.value)} 
            />
             <div className="email error"></div>
            <label htmlFor="telephone">telephone</label>
            <input type="text" className='telephone'  id='telephone' required 
              value={ telephone|| ''}
              onChange={(e)=>setTelephone(e.target.value)} 
            />
             <div className="telephone error"></div>
            <label htmlFor="adresse">adresse</label>
            <input type="text" className='adresse'  id='adresse' required
              value={adresse || ''}
              onChange={(e)=>setAdresse(e.target.value)} 
            />
             <div className="adresse error"></div>
            <label htmlFor="password">password</label>
            <input type="password" className='password'  id='password' required
              value={password || ''}
              onChange={(e)=>setPassword(e.target.value)}
            />
             <div className="password error"></div>
            <label htmlFor="confirmpassword">confirmer votre password</label>
            <input type="password" className='confirmpassword'  id='confirmpassword' required
              value={confirmpassword || '' }
              onChange={(e)=>setConfirmpassword(e.target.value)}
             />
              <div className="confirmpassword error"></div>
            <div className="button">
              <button className='btnquiter' onClick={(()=>setOpen(false))} >Quitter</button>
              <button  className='btnenvoyer' type="submit"> Envoyer</button>
            </div>
            <ClipLoader
                loading={loading}
                cssOverride={override}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <div className="message succes"></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
