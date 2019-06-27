import React, { useState, useEffect } from 'react';
import constants from '../constants'


function Sidebar(props: any) {
    const {socket, user, logout} = props;
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChatState] = useState('');

    const setActiveChat = (activeChat: string) => {
        setActiveChatState(activeChat)
    }
    return (
        <div className="container">

        </div>
    );
}

export default Sidebar;
