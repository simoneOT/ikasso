import React, { useState,useRef } from 'react';
import 'react-day-picker/dist/style.css';
import Day from './calandar/Day';


function Calandar() {
  const [date, seDate] = useState(false)
  const refdateentrer = useRef()
  const refdatesorie = useRef()
  window.addEventListener("click", (e) => {
      if (e.target !== refdateentrer.current && e.target !== refdatesorie.current  ) {
        seDate(false)
      }
  })
  // let footer = "";
  // if (range?.from) {
  //   if (!range.to) {
  //     footer = moment(range.from).format('LL')
  //   } else if (range.to) {
  //     footer = moment(range.to).format('LL')
  //   }
  // }
  return (
    <div className="calandar" >
      <div className="calandardate" >
        <div className="dateentrer" ref={refdateentrer} onClick={() => {
            refdatesorie.current.classList.remove('active')
            refdateentrer.current.classList.toggle('active')
            seDate(true)
          }}>Date entrée</div>
        <div className="datesorie" ref={refdatesorie} onClick={() => {
          refdateentrer.current.classList.remove('active')
          refdatesorie.current.classList.toggle('active')
          seDate(true)
        }}>Date de sortie</div>
      </div>
      {
        date &&
        <div className="DayPicker" >
            <Day/>
        </div>
        }
    </div>
  );
  
}

export default Calandar
