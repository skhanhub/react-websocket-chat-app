import React, { useState, useEffect } from 'react';
// import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down'
// import FAMenu from 'react-icons/fa/list-ul'
// import FASearch from 'react-icons/lib/fa/search'
// import MdEject from 'react-icons/lib/md/eject'

import { FaChevronDown } from 'react-icons/fa';
import { IoMdMenu, IoIosSearch } from "react-icons/io";
import { MdEject } from "react-icons/md";

function Sidebar(props: any) {
    const {chats, activeChat, user, setActiveChat, logout} = props;

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
                ref='users' 
                onClick={(e)=>{ (e.target === props.refs.user) && setActiveChat('') }}>
                
                {
                chats.map((chat: any)=>{
                    if(chat.name){
                        const lastMessage = chat.messages[chat.messages.length - 1];
                        const user = chat.users.find((name: string)=>{
                            return name !== this.props.name
                        }) || { name:"Community" }
                        const classNames = (activeChat!=='' && activeChat.id === chat.id) ? 'active' : ''
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
                <span>{user.name}</span>
                <div onClick={()=>{logout()}} title="Logout" className="logout">
                    <MdEject/>	
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
