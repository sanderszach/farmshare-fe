import React, { useEffect, useState } from 'react'
import { farmsService } from '../../services'
import { Farm } from '../../types'

export const Dashboard:React.FC = () => {
    const [name,setName] = useState()
    const [farmRes,setFarmRes] = useState()
    
    const handleSubmit = () => farmsService.createFarm({name: name}, setFarmRes)
    const handleNameChange = (e) => setName(e.target.value)

    return(
        <div>
            Dashboard
            <label>
                <p>Username</p>
                <input type="text" onChange={handleNameChange}/>
            </label>
            <button type='submit' onClick={handleSubmit}>Create Farm</button>
            {JSON.stringify(farmRes)}
        </div>
    )
}