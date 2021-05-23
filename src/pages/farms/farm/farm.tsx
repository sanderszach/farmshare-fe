import React, { Children, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { formatNumber } from '@telerik/kendo-intl';
import { Card, CardLayout, DataValue, PageWrapper, SectionHeader, StyledDataValue } from '../../../components';
import { CardWidth } from '../../../components/card/types/card.types';
import { farmsService, seasonsService } from '../../../services'
import { Farm as IFarm, Season, seasonStatus } from '../../../types'
import { Chip } from '@progress/kendo-react-buttons';

const API_URL = process.env.REACT_APP_API_URL

interface OwnProps {
    season:Season
    showFarm?:boolean
    discount?:number
}

export const SeasonCard:React.FC<OwnProps> = ({season,showFarm,discount}) => {
    return(
        <Card title={season.name} width={CardWidth.normal}>
            {season.status && 
                <StyledDataValue>
                    <Chip 
                        text={seasonStatus[season.status].displayText} 
                        type={seasonStatus[season.status].type }
                    />
                </StyledDataValue>
            }
            {showFarm && season.farm_id.id && <DataValue label="Farm">
                <a href={`/farms/${season.farm_id.id}`}>{season.farm_id.name}</a>
                </DataValue>
            }
            <DataValue label="Start Date">{season.start_date}</DataValue>
            <DataValue label="End Date">{season.end_date}</DataValue>
            <DataValue label="Price">
                {discount ? <del style={{paddingRight:'10px'}}>{formatNumber(season.price || 0,"c0")}</del> : formatNumber(season.price || 0,"c0")}
                {discount && (season.price || 0) > 0 && formatNumber((season.price || 0) * (1-discount),"c0")}
            </DataValue>
        </Card>
    )
}

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
                    <SeasonCard key={season.id} season={season}/>
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
