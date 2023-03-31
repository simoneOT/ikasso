import React from 'react'
import Header from '../../Component/Dasbord/Header'
import Navbar from '../../Component/Dasbord/Navbar'
import AppartementPost from '../../Component/Dasbord/Appartement/AppartementPost'

function PostAppartement() {
  return (
   <>
        <Navbar />
        <div className="container-dasbord">
              <Header />
              <AppartementPost/>
        </div>
    </>
  )
}

export default PostAppartement
