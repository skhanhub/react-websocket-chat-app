import * as uuidv4 from 'uuid/v4';

const getTime = (date: Date) => `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`

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

export const createUser = (name: string = '') => {
    return {
        id: uuidv4(),
        name: name,
    }
}

export const createMessage = (message: string = '', sender: string = '') => {
    return {
        id: uuidv4(),
        time: getTime(new Date(Date.now())),
        message,
        sender,
    }
}

export const createChat = (messages: Array<Message> = [], name: string = 'Community', users: Array<User> = []) => {
    return {
        id: uuidv4(),
        name,
        messages,
        users,
        typingUsers: [],
    }
}