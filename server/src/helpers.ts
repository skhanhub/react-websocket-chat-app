import * as uuidv4 from 'uuid/v4';

export const createUser = (name: string = '') => {
    return {
        id: uuidv4(),
        name: name,
    }
}
