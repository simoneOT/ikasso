import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import Popup from 'reactjs-popup';

function Popupspiner() {
   
    return (
        <ClipLoader
            loading={true}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
  )
}

export default Popupspiner
