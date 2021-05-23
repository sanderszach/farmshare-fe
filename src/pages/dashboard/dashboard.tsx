import React, { useContext, useEffect, useState } from 'react'
import { eaterGroupsService, farmsService, messagesService, userService } from '../../services'
import { UserContext } from '../../contexts'
import { EaterGroup, Farm, Season } from '../../types'
import { Card } from '@progress/kendo-react-layout'
import styled from 'styled-components'
import { List, ListItem } from '../eater-groups/eater-group/eater-group'
import { EaterGroupCard, FarmCard } from '..'
import { SeasonCard } from '../farms/farm/farm'
import { Button } from '@progress/kendo-react-buttons'
import { Message } from '../../types'
import { theme } from '../../theme'
import moment from 'moment'

export const Dashboard:React.FC = () => {
    const userData = useContext(UserContext)
    const [messages,setMessages] = useState<Message[]>([])

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
        messagesService.getMessages(setMessages)
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
                        {messages.map(message => 
                            <ListItem key={message.id}>
                                <MessageItem subject={message.subject} body={message.body || ''} date={message.date_created}/>
                            </ListItem>
                        )}
                    </List>
                </ContainerCard>

                {currentData && 
                    <ContainerCard col={2}>
                        <h2>My Current Enrollments</h2>
                        {/* {JSON.stringify(currentEaterGroups[0].eater_groups_id)} */}
                        {currentData.eaterGroup ? 
                            <EaterGroupCard eaterGroup={currentData.eaterGroup}/> : 
                            <div>
                                <p>You are not currently enrolled in a Crop Group.</p>
                                <Button primary onClick={() => window.location.href = '/eatergroups'}>Find a Crop Group</Button>
                            </div>
                        }
                        {currentData.season && <SeasonCard season={currentEaterGroups[0].eater_groups_id.seasons[0].seasons_id} discount={currentData.eaterGroup.discount_rate} /> }
                        {currentData.farm && <FarmCard farm={currentEaterGroups[0].eater_groups_id.seasons[0].seasons_id.farm_id}/> }
                    </ContainerCard>
                }
            </DashboardContent>            
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
    date:Date
}
export const MessageItem:React.FC<OwnProps> = ({subject,body,date}) => {
    return(
        <div style={{width:'100%'}}>
            <MessageTitle>
                <h3 style={{flex:1}}>{subject}</h3>
                <MessageDate style={{flex:1}}>{moment(date).fromNow()}</MessageDate>
            </MessageTitle>

            
            <div dangerouslySetInnerHTML={{ __html: body }}></div>
        </div>
    )
}

const MessageTitle = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-content: center;
    align-items: center;
`

const MessageDate = styled.p`
    flex:1;
    color: ${theme.colors.grey.medium};
    text-align: right;
`