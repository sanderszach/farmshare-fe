import React, { useContext, useEffect, useState } from 'react'
import { farmsService, userService } from '../../services'
import { UserContext } from '../../contexts'
import { EaterGroup } from '../../types'

export const Dashboard:React.FC = () => {
    // const [name,setName] = useState()
    // const [farmRes,setFarmRes] = useState()
    const userData = useContext(UserContext)
    const [userEaterGroups,setUserEaterGroups] = useState<EaterGroup[]>([])

    useEffect(() => {
        userService.getUserEaterGroups(userData.id,setUserEaterGroups)
        console.log(userEaterGroups)
    },[userData])
    
    // const handleSubmit = () => farmsService.createFarm({name: name}, setFarmRes)
    // const handleNameChange = (e) => setName(e.target.value)

    return(
        <div>
            <h1>Dashboard</h1>

            {userData.first_name && <p>Welcome {userData.first_name}!</p> }

            {/* Eater */}
            {userEaterGroups.length == 0 ? 
                <div>You have not yet joined a Crop Group. Click HERE to sign up</div> :
                <div>These are your groups{JSON.stringify(userEaterGroups)}</div> 
            }

            {JSON.stringify(userData)}
            <br/><br/>
            
        </div>
    )
}