import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { OneImageappartement } from '../../../query/Url';

function ImageApp({ idapp }) {
    const [imageapp, setImageapp] = useState("")
    useEffect(() => {
        axios.get(`${OneImageappartement}`+idapp)
        .then((res) => {
            setImageapp(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    },[idapp])
  return (
      <img style={{ width: "70px", height: "50px", objectFit: "cover", borderRadius:"5px"}} src={ imageapp[0]?.images? imageapp[0]?.images :"../image/sauter.png" } alt='app' />
  )
}

export default ImageApp
