import React from 'react'
import { useState } from 'react'
import '../style/Slider.css'

function Slider() {
  let[count, setCount]=useState(0)
  let[counter, setCounter]=useState(0)
  
  
  const photos = ['./image/defaultimage.png', './image/test.png', './image/sauter.png' ]
  setInterval(()=>{
    if (count< photos.length-1) {
      count++
    }else{
      count =0
    }
    setCount(count)
  },6000)

  setInterval(()=>{
    if (counter< photos.length-1) {
      counter++
    }else{
      counter =0
    }
    setCounter(counter)
  },8000)


  return (
    <div className='container_home'>
      <div className="slidecontainer">
        <div className="slide">
            <img src={`${photos[count]}`} alt=""/>
        </div>
        <div className="slide1">
            <img src={`${photos[counter]}`} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default Slider
