import React, { useEffect, useState } from 'react'
import { userService } from '../services'
import { User } from '../types'

export const UserContext = React.createContext({} as User)

export const UserContextProvider: React.FC = ({ children }) => {
    const [userData, setUserData] = useState<User>({} as User) //set this to user interface
    useEffect(() => {
        userService.getCurrentUser(setUserData)
        console.log(userData)
    },[''])
    return (
        <UserContext.Provider value={userData}>{children}</UserContext.Provider>
    )
} 