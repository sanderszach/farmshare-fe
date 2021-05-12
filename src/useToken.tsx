import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        if( tokenString ){
            const userToken = JSON.parse(tokenString);
            return userToken?.data
        }
    }
    
    const saveToken = (userToken) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.data);
    }
    
    const [token, setToken] = useState(getToken());

    return {
        setToken: saveToken,
        token
      }

}