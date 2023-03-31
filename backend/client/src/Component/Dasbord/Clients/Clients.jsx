import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { user } from '../../../query/Url'
import Delete from './Delete'

function Clients() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`${user}`)
      try {
          setUsers(res.data)
        } catch (error) {
          console.log(error)
        }
    }
    getUsers()
  },[])
  return (
  <>
    <div className="content-reservation" style={{position:"fixed"}}>
      <div className="title_reservation">
        <h1> Liste des clients</h1>
      </div>
    </div>
    <main>
      <div className="body-case" style={{backgroundColor:"white"}}>
        <div className="tableau">
          <table style={{width: "100%"}}>
            <thead>
              <tr>
                <td>Numéro</td>
                <td>Nom</td>
                <td>Adress</td>
                <td>TéLéphone</td>
                <td>Email</td>
                <td>Profil</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => {
                  if (user.admin!==false) {
                    return (
                      <tr className={`appartement${index}`} key={index}>    
                        <td style={{padding:"10px",fontSize:"20px", color:"rgb(42, 65, 165)", fontWeight:"600"}}>{index + 1}</td>
                        <td>{user.nom}</td>
                        <td>{ user.adresse}</td>
                        <td>{user.telephone }</td>
                        <td>{user.email }</td>
                        <td className='profil-client'>
                          <img src={user.profil?user.profil:"/image/defaultimage.png"} alt="profile" />
                        </td>
                        <td className='delete'><Delete users={users} setUsers={setUsers} userId={user.id} /></td>
                      </tr>  
                    )
                  } else {
                    return""
                  }
                })
              }      
            </tbody>
          </table>
          </div>
        </div>
          <div className="addappartement">
            <div className="add">
              <span></span>
            </div>
          </div>
    </main>
 </>      
  )
}

export default Clients
