import React, { useCallback, useContext } from 'react'
import { SocketContext } from './SocketContext';

function SocketTest() {
  const connection = useContext(SocketContext)?.connection;
  const invokeMessage = useContext(SocketContext)?.invokeMessage;


  const sendLocation = useCallback(async()=>{
      navigator.geolocation.getCurrentPosition(
        position => {
          const data = {event: 'RequestARide', data: JSON.stringify({latitude: position.coords.latitude, longitude: position.coords.longitude})}
          console.log('Trip', data)
          invokeMessage(JSON.stringify(data))
        }, err => {
          console.info(err)
        }
      )
  },[connection])

  return (
    <div className='container'>
      <button onClick={sendLocation}>Send Location</button>
    </div>
  )
}

export default SocketTest