import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { user } from '../../query/Url'

function Profil({ userId }) {
    const [value, setValue] = useState(false)
    const [userData, setUserData] = useState([])
    useEffect(()=>{
    const getOneAppartement= async()=>{
      try {
        const res = await axios.get(user+userId)
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
        <div className="PropProfil">
            <img  src={userData[0]?.Profil?userData[0]?.Profil:"../image/defaultimage.png"} alt="" />
        </div>
      </div>
    </>
  )
}

export default Profil