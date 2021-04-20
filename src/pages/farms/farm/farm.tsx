import React, { Children, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Card, CardLayout, PageWrapper, SectionHeader } from '../../../components';
import { CardWidth } from '../../../components/card/types/card.types';
import { farmsService, seasonsService } from '../../../services'
import { Farm as IFarm, Season, seasonStatus } from '../../../types'
import { Chip } from '@progress/kendo-react-buttons';

const API_URL = process.env.REACT_APP_API_URL

export const Farm:React.FC = () =>{
    const { farmId } = useParams<{farmId:string}>()
    const [farm, setFarm] = useState<IFarm>({})
    const [seasons, setSeasons] = useState<Season[]>([])
    useEffect(() => {
        farmsService.getFarms(setFarm,farmId)
    },[''])
    useEffect(() => {
        seasonsService.getSeasons(setSeasons,farmId)
    },[''])

    return(
        <div>
            <StyledBanner src={`${API_URL}/assets/${farm.image}`} />
            <HeaderWrapper>
                <h1>{farm.name}</h1>
                <p>{farm.city}, {farm.state}</p>
            </HeaderWrapper>
            <SectionHeader>Seasons</SectionHeader>
            <CardLayout>
                {seasons.map(season => 
                    <Card title={season.name} width={CardWidth.normal}>
                        {season.status && 
                            <StyledDataValue>
                                <Chip 
                                    text={seasonStatus[season.status].displayText} 
                                    type={seasonStatus[season.status].type }
                                />
                            </StyledDataValue>
                        }
                        <DataValue label="Start Date">{season.start_date}</DataValue>
                        <DataValue label="End Date">{season.end_date}</DataValue>
                        <DataValue label="Price">{season.price}</DataValue>
                    </Card>
                )}
            </CardLayout>
        </div>
    )
}

const StyledBanner = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
`

const HeaderWrapper = styled.div`
    padding: 20px 0;
`

const StyledLabel = styled.label`
    font-weight:700;
`
const DataValue:React.FC<{label:string}> = (props) => {
    return(
        <StyledDataValue>
            <StyledLabel>{props.label}: </StyledLabel><span>{props.children}</span>
        </StyledDataValue>
    )
}

const StyledDataValue = styled.div`
    padding: 5px 0;
`