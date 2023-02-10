import { clamp } from "date-fns"
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
    if (date) {
        let dateenrer= moment(date?.date?.dateenrer).format('L').split('/')[1]
        let  datesortie = moment(date?.date?.datesortie).format('L').split('/')[1]
        let numberday = 0
        for (let index = dateenrer; index <= datesortie; index++) {
            numberday++
        }
        return numberday
    }
}
export const accountservice={
    stockToken, removeToken, islogged, acountday
}
