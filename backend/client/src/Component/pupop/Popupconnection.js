import React from 'react'
import Popup from 'reactjs-popup'

function Popupconnection() {
  return (
      <Popup>
          {
            close => (
                <>
                    <div className="close">
                        <button onClick={close}>
                            &times;
                        </button>
                    </div>
                    <div className='modal'>
                        <form className="container_form" >
                            <label htmlFor="email">Email</label>
                            <input type="email" className='email'  id='email' required
                            // value={ email|| '' }
                            // onChange={(e)=>setEmail(e.target.value)} 
                            />
                            <label htmlFor="password">password</label>
                            <input type="password" className='password'  id='password' required
                            // value={password || ''}
                            // onChange={(e)=>setPassword(e.target.value)}
                            />
                            <div className="password error"></div>
                            <div className="button">
                                <button  className='btnenvoyer' type="submit"> Se connecter</button>
                            </div>
                            <div className="message succes"></div>
                        </form>
                    </div>
                </>
              )
          }
         
    </Popup>
  )
}

export default Popupconnection
