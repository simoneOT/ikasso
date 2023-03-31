import React from 'react'
import Slider from '../Component/Slider'
import Liste from '../Component/Liste'
import Navbar   from "../Component/Navbar";

function Home() {
  return (
    <div className='container_home'>
      <Navbar/>
      <Slider/>
      <Liste/>
    </div>
  )
}

export default Home
