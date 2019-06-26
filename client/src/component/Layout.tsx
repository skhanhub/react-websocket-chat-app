import React, { useState } from 'react';
import io from 'socket.io-client'

const socketURL = 'localhost:5000'
function Layout(props: any) {
    const { title } = props;
    const [socket, setSocket] = useState(null)

    const initSocket = () => {
        const socket = io(socketURL);
        setSocket(socket);
    }
    return (
        <div className="container">
        {title}
        </div>
    );
}

export default Layout;
