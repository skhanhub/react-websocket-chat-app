import {io} from './app'
import constants from './constants'
import {createUser, createChat, createMessage, User, Message} from './helpers'

let connectedUsers = {};
let communityChat = createChat();



export default function(socket){
    console.log(`socket id: ${socket.id}`);
    
    let sendMessageToChatFromUser;
    let sendTypingFromUser;
    
    socket.on(constants.VERIFY_USER, (nickname: string, callback)=>{
        if(isUser(connectedUsers, nickname)){
            callback({isUser: true, user: null});
        }
        else{
            callback({isUser: false, user: createUser(nickname)})
        }
    })

    socket.on(constants.USER_CONNECTED, (user: User) => {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;

        sendMessageToChatFromUser = sendMessageToChat(user.name)
        sendTypingFromUser = sendTypingToChat(user.name)

        io.emit(constants.USER_CONNECTED, connectedUsers)
        console.log({connectedUsers});
    })

    socket.on('disconnect', ()=>{
		if("user" in socket){
			connectedUsers = removeUser(connectedUsers, socket.user.name)

			io.emit(constants.USER_DISCONNECTED, connectedUsers)
			console.log("Disconnect", connectedUsers);
		}
    })
    
    socket.on(constants.LOGOUT, ()=>{
		connectedUsers = removeUser(connectedUsers, socket.user.name)
		io.emit(constants.USER_DISCONNECTED, connectedUsers)
		console.log("Disconnect", connectedUsers);

    })
    
    socket.on(constants.COMMUNITY_CHAT, (callback)=>{
		callback(communityChat)
	})

    
	socket.on(constants.MESSAGE_SENT, (chatId: string, message: string)=>{
        console.log(chatId, message)
		sendMessageToChatFromUser(chatId, message)
	})

	socket.on(constants.TYPING, (chatId: string, isTyping: boolean)=>{
        console.log(chatId, isTyping)
		sendTypingFromUser(chatId, isTyping)
	})
}


function sendTypingToChat(user: string){
	return (chatId: string, isTyping: boolean)=>{
        console.log('sendTypingToChat', {user, chatId, isTyping})
		io.emit(`${constants.TYPING}-${chatId}`, {user, isTyping})
	}
}


function sendMessageToChat(sender: string){
	return (chatId: string, message: string)=>{
		io.emit(`${constants.MESSAGE_RECIEVED}-${chatId}`, createMessage(message, sender))
	}
}

const isUser = (connectedUsers, username: string) => {
    return username in connectedUsers;
}

const removeUser = (connectedUsers, username: string) => {
    let newList = {...connectedUsers}
    delete newList[username];
    return newList;
}

const addUser = (connectedUsers, user: User) => {
    let newList = {...connectedUsers}
    newList[user.name] = user;
    return newList;
}