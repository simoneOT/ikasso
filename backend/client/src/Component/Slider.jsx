import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SimpleImageSlider from "react-simple-image-slider";
import { OneImageappartement } from '../query/Url';
import '../style/Slider.css'
import { image } from './redux/slice/dateredux';


function Slider() {
  const imgs = useSelector(state => state.dateRedux.image)
   const dispatch = useDispatch()
  let img = imgs.map((img) => { return `.${img.images}` })
  console.log(img);
  useEffect(  () =>  {
    const getAllImage = async () => {
      const res = await axios.get(`${OneImageappartement}allimage/images/`)
      try {
       dispatch(image(res.data))
      } catch (error) {
        console.log(error);
      }
    }
    getAllImage()
  },[])
  

  return (
    <div className='app'>
      <div className="container-slider">
        <div className="wraper-slider">
          <div className="slider1">
            <SimpleImageSlider
              width={784.5}
              height={504}
              images={img}
              showNavs={true}
               autoPlay={true}
              slideDuration={0.7}
              startIndex={0.3}
            />
        </div>
        <div className="slider2">
          <SimpleImageSlider
            width={784.5}
            height={504}
            images={img}
            showNavs={true}
            autoPlay={true}
            slideDuration={0.9}
          />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Slider
