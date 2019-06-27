import uuidv4 from 'uuid/v4';

interface ICreateUser {
    id: string,
    name: string,
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

const createChat = (messages: Array<string> = [], name: string = 'Community', users: Array<string> = []) => {
    return {
        id: uuidv4(),
        name,
        messages,
        users,
        typingUsers: [],
    }
}
export const getTime = (date: Date) => `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`