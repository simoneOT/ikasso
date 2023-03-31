import axios from 'axios'
import React, { useEffect, useState } from 'react'


function Image({idapp}) {
    const[image, setImage]=useState([])
    useEffect(()=>{
        const getImages= async()=>{
            try {
              const res = await axios.get(`http://localhost:5000/api/app_ch/getAppartement/Appartement/display/${idapp}`)
              setImage(res.data);
            } catch (error) {
              console.log(error)
            }
          }
          getImages()
      },[idapp])
  return (
    <div className='image'>
        {
           image[0]?.images !==undefined ? <img src={image[0]?.images} alt='imageApp'/> : <img src='./image/sauter.png' alt='imagedefault'/>
        }
    </div>
  )
}

export default Image
