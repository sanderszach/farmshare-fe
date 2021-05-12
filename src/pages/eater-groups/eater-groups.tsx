import { Chip } from '@progress/kendo-react-buttons'
import { formatNumber } from '@telerik/kendo-intl';
import React, { useContext, useEffect, useState } from 'react'
import { Card, CardLayout, DataValue, SectionHeader, StyledDataValue } from '../../components'
import { CardWidth } from '../../components/card/types/card.types'
import { UserContext } from '../../contexts'
import { eaterGroupsService } from '../../services'
import { EaterGroup } from '../../types'

interface OwnProps {
    eaterGroup:EaterGroup
}
const EaterGroupCard:React.FC<OwnProps> = ({eaterGroup}) => {
    return(
        <Card title={eaterGroup.name} width={CardWidth.normal}>
            {eaterGroup.organization_id?.name ?
                <DataValue label="Organization">{eaterGroup.organization_id?.name}</DataValue> :
                <StyledDataValue>
                    <Chip 
                        text="public"
                        type="info"
                    />
                </StyledDataValue>
            }
            <DataValue label="Members">{eaterGroup.eaters.length}</DataValue>
            <DataValue label="Discount Rate">{ formatNumber(eaterGroup.discount_rate,"p")}</DataValue>
            <StyledDataValue>
                {eaterGroup.seasons.filter(x => x.seasons_id?.status=="enrolling").length > 0 && 
                    <Chip 
                        text="Enrolling"
                        type="success"
                    />
                }
            </StyledDataValue>
        </Card>
    )
}

export const EaterGroups:React.FC = () => {
    const userData = useContext(UserContext)
    const [AllEaterGroups,setAllEaterGroups] = useState<EaterGroup[]>([])
    const [CurrentEaterGroups,setCurrentEaterGroups] = useState<{eater_groups_id:EaterGroup}[]>([])
    useEffect(() => {
        eaterGroupsService.getAllEaterGroups(setAllEaterGroups,userData.organization_id)
        eaterGroupsService.getCurrentEaterGroups(setCurrentEaterGroups)
        console.log(AllEaterGroups)
    },[userData])


    return(
        
        <div>
            { CurrentEaterGroups && CurrentEaterGroups.length > 0 ?
                <>
                    <SectionHeader>My Crop Groups</SectionHeader>
                    <CardLayout>
                        {CurrentEaterGroups.map(eaterGroup => 
                            <EaterGroupCard eaterGroup={eaterGroup.eater_groups_id} />
                        )}
                    </CardLayout>
                </>
                :
                <p>You are not currently enrolled in a crop group. Search below to join a group.</p>
            }
            { AllEaterGroups && AllEaterGroups.length > 0 &&
                <>
                    <SectionHeader>Search Crop Groups</SectionHeader>
                    <CardLayout>
                        {AllEaterGroups.map(eaterGroup => 
                            <EaterGroupCard eaterGroup={eaterGroup} />
                        )}
                    </CardLayout>
                </>
            }
            {/* <h1>All Available Crop Groups</h1>
            {JSON.stringify(AllEaterGroups)}
            <h1>Current Crop Groups</h1>
            {JSON.stringify(CurrentEaterGroups)} */}
        </div>
    )
}