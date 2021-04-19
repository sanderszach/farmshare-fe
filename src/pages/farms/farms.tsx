import React, { useEffect, useState } from 'react'
import { farmsService } from '../../services'
import { Farm } from '../../types'
import { Card, CardHeader, CardTitle, CardImage, CardSubtitle } from '@progress/kendo-react-layout';
import styled from 'styled-components'

const API_URL = process.env.REACT_APP_API_URL

export const Farms:React.FC = () => {
    const [farms, setFarms] = useState<Farm[]>([])
    useEffect(() => {
        farmsService.getFarms(setFarms)
        console.log(farms)
    },[''])

    const handleClick = (e:React.MouseEventHandler<HTMLButtonElement>,farmId) => window.location.href=`/farms/${farmId}`
    
    return(
        <CardLayout>
            {farms && farms.map(farm => 
                <CardWrapper key={farm.id} onClick={(e) => handleClick(e,farm.id)}>
                    <StyledCard>
                        <CardHeader>
                            <CardTitle>
                                {farm.name}
                            </CardTitle>
                            <CardSubtitle>
                                {farm.city}, {farm.state}
                            </CardSubtitle>
                        </CardHeader>
                        {farm.image && <CardImage src={`${API_URL}/assets/${farm.image}`} />}
                    </StyledCard>
                </CardWrapper>
            )}
        </CardLayout>
    )
}

const CardLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const StyledCard = styled(Card)`
    height: 250px;
    width: 250px;
`
const CardWrapper = styled.div<{onClick?}>`
    ${(props) => props.onClick && `cursor: pointer;`}
    margin: 20px;
`
