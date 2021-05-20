import React, { useContext, useEffect, useState } from 'react'
import { eaterGroupsService, farmsService, userService } from '../../services'
import { UserContext } from '../../contexts'
import { EaterGroup, Farm, Season } from '../../types'
import { Card } from '@progress/kendo-react-layout'
import styled from 'styled-components'
import { List, ListItem } from '../eater-groups/eater-group/eater-group'
import { EaterGroupCard, FarmCard } from '..'
import { SeasonCard } from '../farms/farm/farm'

export const Dashboard:React.FC = () => {
    const userData = useContext(UserContext)

    const getCurrentData = (data:{eater_groups_id:EaterGroup}[]):CurrentData => {
        const eaterGroup = data[0].eater_groups_id
        const season = eaterGroup.seasons.length > 0 ? eaterGroup.seasons.filter(season => season.seasons_id.status =='in-progress')[0].seasons_id : undefined
        const farm = season ? season.farm_id : undefined
        return {
            eaterGroup: eaterGroup,
            season: season,
            farm: farm
        }
    }
    const [currentEaterGroups,setCurrentEaterGroups] = useState<{eater_groups_id:EaterGroup}[]>([])

    interface CurrentData {
        eaterGroup:EaterGroup
        season?:Season
        farm?:Farm
    }
    const [currentData,setCurrentData] = useState<CurrentData>({} as CurrentData)

    useEffect(() => {
        eaterGroupsService.getCurrentEaterGroups(setCurrentEaterGroups)
    },[''])

    useEffect(() => {
        if(currentEaterGroups && currentEaterGroups[0]){
            setCurrentData(getCurrentData(currentEaterGroups))
        }
    },[currentEaterGroups])

    return(
        <div>
            <h1>Dashboard</h1>

            {userData.first_name && <h3>Hello {userData.first_name} 👋</h3> }

            <DashboardContent>
                {/* Messages */}
                <ContainerCard col={3}>
                    <h2>Messages</h2>
                    <List>
                        <ListItem><Message subject="Welcome!" body="Here is a test paragraph" /></ListItem>
                    </List>
                </ContainerCard>

                {currentData && 
                    <ContainerCard col={2}>
                        <h2>My Current Enrollments</h2>
                        {/* {JSON.stringify(currentEaterGroups[0].eater_groups_id)} */}
                        {currentData.eaterGroup && <EaterGroupCard eaterGroup={currentData.eaterGroup}/>}
                        {currentData.season && <SeasonCard season={currentEaterGroups[0].eater_groups_id.seasons[0].seasons_id} discount={currentData.eaterGroup.discount_rate} /> }
                        {currentData.farm && <FarmCard farm={currentEaterGroups[0].eater_groups_id.seasons[0].seasons_id.farm_id}/> }
                    </ContainerCard>
                }
            </DashboardContent>

            {/* Eater */}
            {/* {currentEaterGroups.length == 0 ? 
                <div>You have not yet joined a Crop Group. Click HERE to sign up</div> :
                <div style={{width:'300px'}}>These are your groups{JSON.stringify(currentEaterGroups)}</div> 
            } */}

            {/* Current Season Group */}
            {/* {JSON.stringify(currentEaterGroups.map(x => x.eater_groups_id.seasons.filter(y => y.seasons_id.start_date <= new Date() && y.seasons_id.end_date >= new Date()).length ))} */}


            {/* <div style={{width:'100px'}}>{JSON.stringify(userData)}</div> */}
            <br/><br/>
            
        </div>
    )
}

const ContainerCard = styled(Card)<{col?:number}>`
    padding: 20px;
    flex: ${props => (props.col || 1).toString()};
    margin: 12px;
`
const DashboardContent = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 600px) {
        display: block;
    }
`

interface OwnProps {
    subject:string
    body:string
}
export const Message:React.FC<OwnProps> = ({subject,body}) => {
    return(
        <div>
            <h3>{subject}</h3>
            <p>{body}</p>
        </div>
    )
}