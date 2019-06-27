import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'
import constants from '../constants'
import LoginForm from './LoginForm'
import ChatContainer from './ChatContainer'
const socketURL = 'localhost:5000'

function Layout(props: any) {
    const { title } = props;
    const [socket, setSocket] = useState()
    const [user, setUserState] = useState('')

    const setUser = (user: string)=>{
        socket.emit(constants.USER_CONNECTED, user);
        setUserState(user);
    }

    const logout = () => {
        socket.emit(constants.LOGOUT);
        setUserState('');
    }

    useEffect(()=>{
        const initSocket = () => {
            const socket = io(socketURL);
            socket.on('connect', ()=>{
                console.log('connected');
            })
            setSocket(socket);
        }
        initSocket();
    }, []);

    return (
        <div className="container">
            
            {
            user === ''?
            <LoginForm 
                socket={socket} 
                setUser={setUser}
            />:
            <ChatContainer
                socket={socket}
                user={user}
                logout={logout}
            />
            }
        </div>
    );
}

export default Layout;
