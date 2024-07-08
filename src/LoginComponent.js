import React, {useCallback,useContext, useState, useEffect} from 'react'
import axios from 'axios';
import { AuthContext } from './AuthContext';
import SocketTest from './SocketTest';
import { SocketProvider } from './SocketContext';

export default function LoginComponent() {
    const [userName, setUserName] = useState("m.hanafi@gmail.com");
    const [password, setPassword] = useState("Hanof8870@99");

    const {user, setUser} = useContext(AuthContext);


    const login = useCallback(async () => {
        try {
        const response = await axios.post('http://mohd3113-002-site4.dtempurl.com/api/Auth/Login', {
            userName,
            password,
        });
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
            console.error(error.response.data)
        }
  }, [userName, password])


  return (
    <>
        {!user ? (<><input
            type='text'
            placeholder='username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
        <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        <button onClick={login}>
            Login
        </button>
        </>):<SocketProvider token={user.token}><SocketTest/></SocketProvider>}
    </>
  )
}
