import React, { useEffect, useState } from 'react'
import {  DayPicker } from 'react-day-picker';
import { addDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { daletegetdate, datareservation, getdate } from '../redux/slice/dateredux';
import moment from 'moment';
import { accountservice } from '../Log/accountservice';

function DayNavbar({ close }) {
  const dispatch = useDispatch()
  const date = useSelector(state => state.dateRedux)
  const[hundaldate, setHundaldate] = useState()
  const frais = accountservice.acountday(hundaldate) * date.reservation?.price
  const fraisService = accountservice.acountday(hundaldate) * 50
  const total = frais + fraisService
  const pastMonth = new Date();
  const defaultSelected={
    from: pastMonth,
    to: addDays(pastMonth, 4)
  };
  const [range, setRange] = useState(defaultSelected);
  const dateres={
     dateenrer: range? moment(range?.from).format():"",
     datesortie: range?moment(range?.to).format():"",
  }
  let reservationdata = {
      image: date.reservation?.image,
      price: date.reservation?.price ,
      frais: frais,
      fraisService: fraisService,
      total: total,
  }
  let datecourant = pastMonth.getFullYear()
  let datepasse = pastMonth.getFullYear() - 1
  let datereel = null
  if (datecourant > datepasse) {
      datereel=datecourant
  }

  useEffect(() => {
      setHundaldate(date)
    }, [date])
  return (
    <div className='containerday'>
      <div className="close">
        <button onClick={close}>
            &times;
        </button>
      </div>
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
        <button style={{
          float: "right", backgroundColor: "rgb(42, 65, 165)", padding: " 20px 40px",
          color: "white", fontSize:"20px", borderRadius:"10px"
        }} onClick={() => {
          close()
          dispatch(getdate(dateres))
          dispatch(datareservation(reservationdata))
        }}>Validé</button>
      </div>
    </div>
  )
}

export default DayNavbar
