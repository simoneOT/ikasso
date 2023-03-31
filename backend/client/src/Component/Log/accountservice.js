
import moment from "moment"

const stockToken = (token)=>{
    localStorage.setItem('token', token)
}
const removeToken = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('uid')
}
const islogged = ()=>{
    let token = localStorage.getItem('token')
    return !!token
}
const acountday = (date) => {
    let  numberDay=0
    if (date) {
        let dateenrer= moment(date?.date?.dateenrer).format('L').split('/')
        let datesortie = moment(date?.date?.datesortie).format('L').split('/')
        var compare_dateenrer = moment([dateenrer[2], dateenrer[0], dateenrer[1]]);
        var compare_datesortie = moment([datesortie[2], datesortie[0], datesortie[1]]);
            if (dateenrer[0]!== datesortie[0] && compare_datesortie>compare_dateenrer) {
                numberDay= compare_datesortie.diff(compare_dateenrer, 'days', true)+1
            } else {
                for (let index = dateenrer[1]; index < datesortie[1]; index++) {
                    numberDay++
                }
                numberDay= numberDay+1
            }
    }
    return numberDay 
}
const clientsReservation = (reservation, idclient) => {
    let idUsers=[]
    if (reservation, idclient) {
        reservation.map((idclients) => {
            if (idclients.idutili === idclient && !idUsers.includes(idclient)) {
                idUsers.push(idclient)
            }
        })
    }
    return idUsers
}
 const isEmpty=(value)=>{
    return(
        value===undefined || value===null
        || (typeof value==='object' && Object.keys(value).length===0)
        || (typeof value==='string' && value.trim().length===0)
    )
}
export const accountservice={
    stockToken, removeToken, islogged, acountday,clientsReservation, isEmpty
}
