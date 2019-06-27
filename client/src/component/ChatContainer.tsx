import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'
import constants from '../constants'


function ChatContainer(props: any) {
    const {socket, user, logout} = props;
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChatState] = useState('');

    const setActiveChat = (activeChat: string) => {
        setActiveChatState(activeChat)
    }
    return (
        <div className="container">
            <Sidebar
                logout={logout}
                chats={chats}
                user={user}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
            />
        </div>
    );
}

export default ChatContainer;
