import { addDays } from 'date-fns';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { accountservice } from '../Log/accountservice';
import {datareservation, getdate } from '../redux/slice/dateredux';

export default () => {
    const pastMonth = new Date();
    const dispatch = useDispatch()
    const date = useSelector(state => state.dateRedux)
    const [hundaldate, setHundaldate] = useState(null)
    const frais = accountservice.acountday(hundaldate) * date.reservation?.price
    const fraisService = accountservice.acountday(hundaldate) * 50
    const total = frais + fraisService
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
    useEffect(() => {
      setHundaldate(date)
    }, [date])
    let reservationdata = {
        image:date.reservation.image,
        price: date.reservation?.price ,
        frais: frais,
        fraisService: fraisService,
        total: total,
    }
  
return(
  <Popup
    trigger={<p className="button">Modifier</p>}
    modal
    nested>
        {close => (
    <>
        <div className="close">
            <button onClick={close}>
                &times;
            </button>
        </div>
        <div className="modal">
            <DayPicker
                numberOfMonths={2}
                pagedNavigation 
                mode="range"
                defaultMonth={pastMonth}
                selected={range}
                onSelect={setRange}
                fromYear={datereel}
                />
                    <button className='updatedate' onClick={() => {
                        accountservice.acountday(dateres)
                        dispatch(getdate(dateres))
                        close()
                        dispatch(datareservation(reservationdata))
                        
                    }}>modifier</button>
        </div>
    </>
    )}
        </Popup>
)};