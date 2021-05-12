import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../contexts'
import { organizationsService } from '../../services/organizations.service'

export const Account:React.FC = () => {
    const userData = useContext(UserContext)
    const [currentOrganization,setCurrentOrganization] = useState()

    useEffect(() => {
        if( userData.organization_id )
            organizationsService.getCurrentOrganization(setCurrentOrganization,userData.organization_id)
    },[userData])

    return(
        <div>
            {JSON.stringify(userData)}
            {JSON.stringify(currentOrganization)}
        </div>
    )
}