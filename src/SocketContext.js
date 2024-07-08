import { createContext, useState, useEffect } from 'react';
import {HttpTransportType} from '@microsoft/signalr';

const signalR = require('@microsoft/signalr');

const SocketContext = createContext(null);

const SocketProvider = ({ children, token }) => {

    const [connection, setConnection] = useState(null);

    useEffect(() => {
        if (!token) {
          return;
        }
        setConnection(
          new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7085/userhub', {
              transport: HttpTransportType.WebSockets,
              skipNegotiation: true,
              accessTokenFactory: () => token,
            })
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect()
            .build(),
        );
      }, [token]);

      const startConnection = async () => {
        try {
          await connection.start()
          console.info('SignalR Connected.');
        } catch (err) {
          console.error('SignalR Connection Error: ', err);
        }
      }

      const invokeMessage = async (message) => {
        try {

          await connection.invoke('Trip', { event: 'RequestARide', data: JSON.stringify({latitude: 24234, longitude: 4234234})});
          console.log('Message sent: ', message);
        } catch (err) {
          console.error('Message failed: ', err);
        }
      }

      useEffect(() => {
        if (!connection) {
          return;
        }
        console.log('starting connection')
        startConnection();
      }, [connection]);

    return (
        <SocketContext.Provider value={{connection, invokeMessage}}>
            {children}
        </SocketContext.Provider>
    );
}
export { SocketContext, SocketProvider };