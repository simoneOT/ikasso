import React from 'react'
import Navbar from '../Component/Navbar'
import Slider from '../Component/Slider'
import Listes from './Listes'


function Home() {
  return (
    <div className='container'>
      <Navbar/>
      <Slider/>
      <Listes/>
    </div>
  )
}

export default Home
