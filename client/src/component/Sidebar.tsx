import React, { useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { IoMdMenu, IoIosSearch } from "react-icons/io";
import { MdEject } from "react-icons/md";
import { Chat, User } from './ChatContainer';



function Sidebar(props: any) {
    const {chats, activeChat, user, setActiveChat, logout} = props;
    const usersEl: React.RefObject<HTMLDivElement> = useRef(null);
    return (
        <div id="side-bar">
            <div className="heading">
                <div className="app-name">Cool Chat <FaChevronDown /></div>
                <div className="menu">
                    <IoMdMenu />
                </div>
            </div>
            <div className="search">
                <i className="search-icon"><IoIosSearch /></i>
                <input placeholder="Search" type="text"/>
                <div className="plus"></div>
            </div>
            <div 
                className="users" 
                ref={usersEl} 
                onClick={(e)=>{
                    console.log('target', {target: e.target, userEl: usersEl.current})
                    return (e.target === usersEl.current) && setActiveChat(null) 
                }}
            >
                
                {
                chats.map((chat: Chat)=>{
                    if(chat.name){
                        const lastMessage = chat.messages[chat.messages.length - 1];
                        const user = chat.users.find((user: User)=>{
                            return user.name !== props.user.name
                        }) || { name:"Community" }
                        const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''
                        return(
                            <div 
                                key={chat.id} 
                                className={`user ${classNames}`}
                                onClick={ ()=>{ setActiveChat(chat) } }
                            >
                            <div className="user-photo">{user.name[0].toUpperCase()}</div>
                            <div className="user-info">
                                <div className="name">{user.name}</div>
                                {lastMessage && <div className="last-message">{lastMessage.message}</div>}
                            </div>
                                
                            </div>
                        )
                    }

                    return null
                })	
                }
                
            </div>
            <div className="current-user">
                <span>{user && user.name}</span>
                <div onClick={()=>{logout()}} title="Logout" className="logout">
                    <MdEject/>	
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
