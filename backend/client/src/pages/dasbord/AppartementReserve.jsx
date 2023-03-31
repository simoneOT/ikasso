import React from 'react'
import Header from '../../Component/Dasbord/Header'
import Navbar from '../../Component/Dasbord/Navbar'
import UpdateReservation from '../../Component/Dasbord/Reservation.jx/UpdateReservation'

function AppartementReserve() {
  return (
    <>
      <Navbar />
      <div className='container-dasbord'>
        <Header />
          <UpdateReservation/>
      </div>
    </>
  )
}

export default AppartementReserve
