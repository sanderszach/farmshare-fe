import React, { useContext, useEffect, useState } from 'react'
import { farmsService, userService } from '../../services'
import { UserContext } from '../../contexts'
import { User } from '../../types'


export const Dashboard:React.FC = () => {
    const [name,setName] = useState()
    const [farmRes,setFarmRes] = useState()
    const userData = useContext(UserContext)
    
    const handleSubmit = () => farmsService.createFarm({name: name}, setFarmRes)
    const handleNameChange = (e) => setName(e.target.value)

    return(
        <div>
            <h1>Dashboard</h1>

            <label>
                <p>Username</p>
                <input type="text" onChange={handleNameChange}/>
            </label>
            <button type='submit' onClick={handleSubmit}>Create Farm</button>
            {JSON.stringify(farmRes)}
            {JSON.stringify(userData.id)}
        </div>
    )
}