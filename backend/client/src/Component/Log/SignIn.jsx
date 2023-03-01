import axios from 'axios';
import React,{CSSProperties, useState} from 'react';
import { useDispatch } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { login } from '../../query/Url';
import { accountservice } from './accountservice';
import {userId} from  '../../Component/redux/slice/user.redux'


function SignIn({setOpen}) {

    let [loading, setLoading] = useState(false);
    const Error= document.querySelector(".password.error")
    const[email, setEmail]=useState('')
  const [password, setPassword] = useState('')
  const dispatch=useDispatch()
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "white",
      };
     const hundalUpdate = async (e)=>{
       e.preventDefault()
        setLoading(true) 
        await axios.post(`${login}`, { email, password})
        .then((res)=>{
          if (res) {
            localStorage.setItem("uid", res.data.id)
            setOpen(false)
            setLoading(false)
           }
          accountservice.stockToken(res.data.token)
        })
        .catch(((error)=>{
            if(error){
              setLoading(false) 
              Error.innerHTML = error.response.data.message
            }
        }))
     }
  return (
    <div className="popup" id='openform'>
      <div className="content_form">
        <div className="form">
          <form className="container_form"  onSubmit={hundalUpdate}>
              <h1>Se connecter</h1>
            <label htmlFor="email">Email</label>
            <input type="email" className='email'  id='email' required
              value={ email|| '' }
              onChange={(e)=>setEmail(e.target.value)} 
            />
            <label htmlFor="password">password</label>
            <input type="password" className='password'  id='password' required
              value={password || ''}
              onChange={(e)=>setPassword(e.target.value)}
            />
             <div className="password error"></div>
            <div className="button">
              <button className='btnquiter' onClick={()=>setOpen(false)} >Quitter</button>
              <button  className='btnenvoyer' type="submit"> Se connecter</button>
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

export default SignIn
