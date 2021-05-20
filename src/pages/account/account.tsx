import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { List, ListItem, ListLabel } from '..'
import { UserContext } from '../../contexts'
import { organizationsService } from '../../services/organizations.service'
import { Organization } from '../../types/organization.interface'

export const Account:React.FC = () => {
    const userData = useContext(UserContext)
    const [currentOrganization,setCurrentOrganization] = useState<Organization>()

    useEffect(() => {
        if( userData.organization_id )
            organizationsService.getCurrentOrganization(setCurrentOrganization,userData.organization_id)
    },[userData])

    return(
        <div>
            <h1>Account</h1>
            <List>
                <ListItem><ListLabel>First Name</ListLabel>{userData.first_name}</ListItem>
                <ListItem><ListLabel>Last Name</ListLabel>{userData.last_name}</ListItem>
                <ListItem><ListLabel>Email</ListLabel>{userData.email}</ListItem>
                <ListItem><ListLabel>Password</ListLabel>{userData.password}</ListItem>
                <ListItem><ListLabel>Organization</ListLabel>{currentOrganization ? currentOrganization.name : `You are not currently part of an organization`}</ListItem>
            </List>
        </div>
    )
}