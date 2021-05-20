import { Button, Chip } from '@progress/kendo-react-buttons'
import { formatNumber } from '@telerik/kendo-intl'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { SeasonCard } from '../..'
import { CardLayout, SectionHeader, StyledLabel } from '../../../components'
import { UserContext } from '../../../contexts'
import { eaterGroupsService } from '../../../services'
import { theme } from '../../../theme'
import { EaterGroup as EaterGroupType } from '../../../types'


export const EaterGroup:React.FC = () => {
    const userData = useContext(UserContext)
    const {eaterGroupId } = useParams<{eaterGroupId:string}>()
    const [eaterGroup,setEaterGroup] = useState<EaterGroupType>({} as EaterGroupType)
    const [currentEaterGroups,setCurrentEaterGroups] = useState<{id:number,eater_groups_id:string,directus_users_id:string}[]>([])
    const [addEaterGroupUserResponse, setAddEaterGroupUserResponse] = useState()

    useEffect(() => {
        eaterGroupsService.getEaterGroup(setEaterGroup,eaterGroupId)
        eaterGroupsService.getCurrentEaterGroups(setCurrentEaterGroups,true)
    },[eaterGroupId,addEaterGroupUserResponse])

    const handleEnrollClick = () => {
        eaterGroupsService.addEaterGroupUser({directus_users_id:userData.id,eater_groups_id:eaterGroupId},setAddEaterGroupUserResponse)
    }
    
    return(
        <div>
            <h1>{eaterGroup.name}</h1>
            {currentEaterGroups.filter(x => x.eater_groups_id == eaterGroupId).length > 0 ? 
                <Chip text="You are enrolled in this Crop Group" type="info" /> : 
                <Button primary onClick={handleEnrollClick}>Enroll in this group</Button>}
            <SectionHeader>Summary</SectionHeader>
            <List>
                <ListItem><ListLabel>Organization</ListLabel>{eaterGroup.organization_id?.name || "Public"}</ListItem>
                <ListItem><ListLabel>Discount</ListLabel>{formatNumber(eaterGroup.discount_rate,"p0")}</ListItem>
                <ListItem><ListLabel>Status</ListLabel>{eaterGroup.status}</ListItem>
                <ListItem><ListLabel>Members</ListLabel>{(eaterGroup.eaters || []).length}</ListItem>
            </List>

            {eaterGroup.seasons &&
                <>
                    <SectionHeader>Seasons</SectionHeader>
                    <CardLayout>
                        {eaterGroup.seasons.map(season => 
                            <SeasonCard season={season.seasons_id} showFarm discount={eaterGroup.discount_rate} />
                        )}
                    </CardLayout>
                </>
            }
        </div>
    )
}

export const List = styled.ul`
    padding: 0 12px;
    list-style: none;
`
export const ListItem = styled.li`
    padding: 12px;
    border-bottom: 1px solid ${theme.colors.grey.light};
    display: flex;
`
export const ListLabel = styled(StyledLabel)`
    min-width: 100px;
    width: 150px;
`