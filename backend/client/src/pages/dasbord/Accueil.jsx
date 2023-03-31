import React from 'react'
import Header from '../../Component/Dasbord/Header'
import Navbar from '../../Component/Dasbord/Navbar'
import AccueilAdmin from '../../Component/Dasbord/Accueil'
import '../../style/dasbord.css'

function Accueil() {
  return (
    <>
        <Navbar />
        <div className="container-dasbord">
        <Header />
        <AccueilAdmin/>
        </div>
    </>
  )
}

export default Accueil
