import {io} from './app'
import constants from './constants'
import {createUser} from './helpers'
import { CLIENT_RENEG_WINDOW } from 'tls';

let connectedUsers = {};

const isUser = (connectedUsers, username) => {
    return username in connectedUsers;
}

const removeUser = (connectedUsers, username) => {
    let newList = {...connectedUsers}
    delete newList[username];
    return newList;
}

const addUser = (connectedUsers, user) => {
    let newList = {...connectedUsers}
    newList[user.name] = user;
    return newList;
}

export default function(socket){
    console.log(`socket id: ${socket.id}`);

    socket.on(constants.VERIFY_USER, (nickname: string, callback)=>{
        if(isUser(connectedUsers, nickname)){
            callback({isUser: true, user: null});
        }
        else{
            callback({isUser: false, user: createUser(nickname)})
        }
    })

    socket.on(constants.USER_CONNECTED, (user: string) => {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;
        io.emit(constants.USER_CONNECTED, connectedUsers)
        console.log(connectedUsers);
    })

}