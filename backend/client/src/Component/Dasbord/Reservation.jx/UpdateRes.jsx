import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Popup from 'reactjs-popup'

function UpdateRes({idReservation}) {
  return (
    <Popup trigger={
        <FontAwesomeIcon icon={faPenToSquare}/>
        } modal position={['top center']} closeOnDocumentClick keepTooltipInside=".tooltipBoundary">
          {
              close => (
                  <>
                      
                  </>
              )
          }
    </Popup>
  )
}

export default UpdateRes
