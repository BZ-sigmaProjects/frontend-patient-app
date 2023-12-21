import { createContext } from 'react'

type user = {
    userId: string,
    firstName: string,
    lastName: string,
    cin: string,
    numBox: number,
};

export const UserContext = createContext<user|undefined>(undefined);
