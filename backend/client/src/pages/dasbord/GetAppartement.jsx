import React from 'react'
import Header from '../../Component/Dasbord/Header'
import GetAppartements from '../../Component/Dasbord/Appartement/GetAppartement'
import Navbar from '../../Component/Dasbord/Navbar'

function GetAppartement() {
  return (
    <>
      <Navbar/>
      <div className='container-dasbord'>
        <Header/>
        <GetAppartements/>
      </div>
    </>
  )
}

export default GetAppartement
