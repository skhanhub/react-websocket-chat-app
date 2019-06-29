import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'
import ChatHeading from './ChatHeading'
import Messages from './Messages'
import MessageInput from './MessageInput'
import constants from '../constants'

export interface User {
    id: string,
    name: string,
}
export interface Message {
    id: string,
    message: string,
    sender: string,
    time: any,
}
export interface Chat {
    id: string,
    name: string,
    messages: Array<Message>,
    users: Array<User>,
    typingUsers: Array<string>,
}

function ChatContainer(props: any) {
    const {socket, logout} = props;
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChat, setActiveChatState] = useState<Chat | null>(null);

    useEffect(()=>{
        socket.emit(constants.COMMUNITY_CHAT, resetChat)
        socket.on('connect', ()=>{
			socket.emit(constants.COMMUNITY_CHAT, resetChat)
		})
        console.log("Emit COMMUNITY_CHAT")
    }, [])

    const resetChat = (chat: Chat)=>{
        console.log("resetChat")
		return addChat(chat, true)
    }

    const addChat = (chat: Chat, reset: boolean)=>{
        console.log("addChat")
        const newChats = reset ? [chat] : [...chats, chat]
        setChats(newChats);
        const temp = reset ? chat : activeChat;
        setActiveChatState(temp);
        
        const typingEvent = `${constants.TYPING}-${chat.id}`
		const messageEvent = `${constants.MESSAGE_RECIEVED}-${chat.id}`
        
		socket.on(typingEvent, updateTypingInChat(chat.id))
		socket.on(messageEvent, addMessageToChat(chat.id))
    }

    const addMessageToChat = (chatId: string)=>{
		return (message: Message) => {

            console.log('addMessageToChat', {activeChat, chats})
			let newChats =  chats.map((chat: Chat)=>{
				if(chat.id === chatId){
                    chat.messages.push(message)
                }
				return chat
			})
			setChats(newChats)
		}
    }
    
    const updateTypingInChat = (chatId: string) =>{
		return (data: any)=>{

            console.log('updateTypingInChat', {activeChat, chats})
			if(data.user !== props.user.name){
                console.log('updateTypingInChat2', {activeChat, chats})
				let newChats = chats.map((chat: Chat)=>{
					if(chat.id === chatId){
						if(data.isTyping && !chat.typingUsers.includes(data.user)){
							chat.typingUsers.push(data.user)
                        }
                        else if(!data.isTyping && chat.typingUsers.includes(data.user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== data.user)
						}
					}
					return chat
				})
				setChats(newChats)
			}
		}
    }
    
    const setActiveChat = (activeChat: Chat) => {
        console.log('setActiveChat', {activeChat, chats})
        setActiveChatState(activeChat)
    }

    const sendMessage = (chatId: string, message: string) => {
        console.log('sendMessage', {activeChat, chats})
        socket.emit(constants.MESSAGE_SENT, chatId, message)
    }

    const sendTyping = (chatId: string, isTyping: boolean) => {
        console.log('sendTyping', {activeChat, chats})
        socket.emit(constants.TYPING, chatId, isTyping)
        
    }

    return (
        <div className="container">
            <Sidebar
                logout={logout}
                chats={chats}
                user={props.user}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
            />
            <div className="chat-room-container">
                {
                    activeChat !== null ? (

                        <div className="chat-room">
                            <ChatHeading name={activeChat.name} />
                            <Messages 
                                messages={activeChat.messages}
                                user={props.user}
                                typingUsers={activeChat.typingUsers}
                                />
                            <MessageInput 
                                sendMessage={
                                    (message: string)=>{
                                        console.log('MessageInput sendMessage', {activeChat, chats})
                                        sendMessage(activeChat.id, message)
                                    }
                                }
                                sendTyping={
                                    (isTyping: boolean)=>{
                                        console.log('MessageInput sendTyping', {activeChat, chats})
                                        sendTyping(activeChat.id, isTyping)
                                    }
                                }
                                />

                        </div>
                    ):
                    <div className="chat-room choose">
                        <h3>Choose a chat!</h3>
                    </div>
                }
            </div>
        </div>
        
    );
}

export default ChatContainer;
