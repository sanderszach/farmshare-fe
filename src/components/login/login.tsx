import React, { Dispatch, SetStateAction, useState } from 'react'

interface OwnProps {
    setToken?: any
}

async function loginUser(credentials) {
    return fetch('http://localhost:8055/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

export const Login:React.FC<OwnProps> = ({setToken}) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    
    const handleUserNameChange = (e) => setUserName(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          email:username,
          password:password
        });

        setToken(token);

        // TODO: This is a temporary solution. It reloads the page after a login
        if(token.data){
            window.location.reload(); 
        }
      }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={handleUserNameChange}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={handlePasswordChange}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}
