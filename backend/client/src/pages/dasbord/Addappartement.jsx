import React from 'react'
import { Link } from 'react-router-dom'
import Addappartements from '../../Component/Dasbord/Appartement/Addappartement'
import Header from '../../Component/Dasbord/Header'
import Navbar from '../../Component/Dasbord/Navbar'

function Addappartement() {
  return (
     <>
        <Navbar />
        <div className="container-dasbord">
          <Header />
          <Addappartements/>
        </div>
    </>
  )
}

export default Addappartement
