import React from 'react'
import Header from '../../Component/Dasbord/Header'
import Navbar from '../../Component/Dasbord/Navbar'
import Client from '../../Component/Dasbord/Clients/Clients'

function Clients() {
  return (
     <>
      <Navbar />
      <div className='container-dasbord'>
        <Header />
        <Client/>
      </div>
    </>
  )
}

export default Clients
