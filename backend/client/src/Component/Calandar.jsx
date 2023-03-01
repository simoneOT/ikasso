import moment from 'moment';
import React, { useState,useRef } from 'react';
import 'react-day-picker/dist/style.css';
import { useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import DayNavbar from './calandar/DayNavbar';


function Calandar() {
  const dateRedux = useSelector(state => state.dateRedux)
  let dateentrer = moment(dateRedux.date.dateenrer).format('L') 
  let datesortie = moment( dateRedux.date.datesortie).format('L')
  const [date, seDate] = useState(false)
  const refdateentrer = useRef()
  const refdatesorie = useRef()
  window.addEventListener("click", (e) => {
      if (e.target !== refdateentrer.current && e.target !== refdatesorie.current  ) {
        seDate(false)
      }
  })
  return (
    <Popup trigger={
      <div className="calandar" >
        <div className="calandardate" >
          <div className="dateentreer-1">
            <div className="dateentrer">Date entrée</div>
            { dateentrer!=="Invalid date"?<p>{dateentrer}</p>:<p>Entrer une date</p>}
          </div>
          <div className="datesorie-1">
            <div className="datesorie">Date de sortie</div>
              {datesortie!=="Invalid date" ? <p>{datesortie}</p>: <p>Entrer une date</p>}
          </div>
        </div>
      </div>
    } modal nested>
      {
        close => (
          <div className="days">
            <DayNavbar close={close} />
          </div>
        )
      }
    </Popup>
  );
  
}

export default Calandar
