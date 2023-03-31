import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { user } from '../../query/Url'

function Profil({ userId }) {
    const [userData, setUserData] = useState([])
    useEffect(()=>{
    const getOneAppartement= async()=>{
      try {
        const res = await axios.get(user + userId)
        setUserData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getOneAppartement()
  },[])
  return (
    <>
      <div className='container_PropProfil' style={{positon:"fixed"}}>
        <div className="PropProfil" style={{ display: "flex", justifyContent:"center", alignItems:"center" }}>
          <p style={{marginRight:"10px"}}>{userData[0]?.nom}</p>
          <img src={userData[0]?.Profil ? userData[0]?.Profil : "../image/defaultimage.png"} alt="" />
        </div>
      </div>
    </>
  )
}

export default Profil