import React, { useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker';
import { addDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { daletegetdate, getdate } from '../redux/slice/dateredux';
import moment from 'moment';

function Day({close}) {
    const pastMonth = new Date();
    let datecourant = pastMonth.getFullYear()
    let datepasse = pastMonth.getFullYear() - 1
    let datereel = null
    if (datecourant > datepasse) {
        datereel=datecourant
    }
    const defaultSelected={
        from: pastMonth,
        to: addDays(pastMonth, 4)
  };
  const [range, setRange] = useState(defaultSelected);
  const dateres={
     dateenrer: range? moment(range?.from).format():"",
     datesortie: range?moment(range?.to).format():"",
  }
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getdate(dateres))
  },[ range])
  return (
    <div className='containerday'>
      <div className="selectday">
        <DayPicker
          numberOfMonths={2}
          pagedNavigation 
          mode="range"
          defaultMonth={pastMonth}
          selected={range}
          onSelect={setRange}
          fromYear={datereel}
        />
        <div className="deleteday">
          <div className="deletedayicon">
            <FontAwesomeIcon icon={faTable} style={{fontSize:"30px", color:"rgba(0, 0, 0, .8)"}} />
          </div>
          <div className="delete">
            <p onClick={() =>{
              dispatch(daletegetdate())
            setRange("")}}>Effacher les dates</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Day
