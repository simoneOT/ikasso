import React, { useContext, useRef, useState } from 'react'
import '../style/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import SignUp from './Log/SignUp'
import SignIn from './Log/SignIn'
import { Uidcontext } from './Log/Appcontext'
import { accountservice } from './Log/accountservice';
import { useEffect } from 'react'
import { user } from '../query/Url'
import axios from 'axios'
import Calandar from './Calandar'


function Navbar() {
    const uid = useContext(Uidcontext)
    const [userdata, setUserdata] = useState([])
    const[value, setValue]= useState(false)
    const[signUp, setSignUp]= useState(false)
    const[signIn, setSignIn]= useState(false)
    const menuRef = useRef()
    const imageRef = useRef()
    window.addEventListener("click", (e)=>{
        if (e.target !== menuRef.current && e.target !== imageRef.current ) {
            setValue(false)
        }
    })
    useEffect( () => {
        uid && axios.get(`${user}`+uid)
        .then((res)=>{
          setUserdata(res.data)
        })
        .catch(((error)=>{
           console.log(error)
        }))
    }, [uid])
  return (
    <div className='container_navbar'>
        <div className="container-wrapper">
            <div className="logo">Logo</div>
            <div className="wrapper">
                  <div className="contenerSearch">
                    <Calandar/>
                    <div className="space"></div>
                    <div className=" nombreplace">Chercher un appartement</div>
                    <div className=" iconsearch">
                        <div className="search">
                        <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container_inf">
                <div className='container_profil' style={{positon:"fixed" }}>
                    <div className="conte" >
                        <div className="profil" ref={menuRef}  onClick={()=>setValue(!value)} >
                            <div className="navbar">
                                <FontAwesomeIcon icon={faBars} />
                            </div>
                            <img src={userdata[0]?.profil && accountservice.islogged()? userdata[0]?.profil:"../image/defaultimage.png"} alt="" />
                        </div>  
                    </div> 
                      {
                    value ?
                        <div className="containerprofil" ref={imageRef}>
                            <ul>
                                {
                                    accountservice.islogged()?
                                    <>
                                        <li onClick={()=>setValue(false)}>Allez vers mon profil</li>
                                        <li onClick={()=>{setValue(false)
                                            accountservice.removeToken()
                                        }}>Se deconnecté</li>
                                    </>
                                    :<>
                                        <li id='open'
                                            onClick={()=>{
                                                setValue(false)
                                                setSignUp(true)
                                                setSignIn(false)
                                            }}>S'inscrire
                                        </li>
                                        <li onClick={
                                            ()=>{
                                                setValue(false)
                                                setSignUp(false)
                                                setSignIn(true)
                                            }}> Se connecté 
                                        </li>
                                    </>
                                }
                            </ul>
                        </div> : ""
                    }
                  </div>
                  <div className='nom'>{accountservice.islogged() && userdata[0]?.nom}</div>
            </div>
        </div>
        {signUp && <SignUp setOpen={setSignUp} />}
        {signIn && <SignIn setOpen={setSignIn} />}
    </div>
  )
}

export default Navbar
