import React, { useEffect, useState } from 'react'
import { farmsService } from '../../services'
import { Farm } from '../../types'
import { Card, CardLayout } from '../../components'
import styled from 'styled-components'

const API_URL = process.env.REACT_APP_API_URL

interface OwnProps {
    farm:Farm
}
export const FarmCard:React.FC<OwnProps> = ({farm}) => {
    const handleClick = (e:React.MouseEventHandler<HTMLButtonElement>,farmId) => window.location.href=`/farms/${farmId}`

    return(
        <Card 
            key={farm.id} 
            handleClick={(e) => handleClick(e,farm.id)}
            title={farm.name}
            subtitle={farm.city && farm.state ? `${farm.city}, ${farm.state}` : ' '}
            imageSrc={farm.image && `${API_URL}/assets/${farm.image}`}
        />
    )
}

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
                <FarmCard farm={farm}/>
                // <Card 
                //     key={farm.id} 
                //     handleClick={(e) => handleClick(e,farm.id)}
                //     title={farm.name}
                //     subtitle={farm.city && farm.state ? `${farm.city}, ${farm.state}` : ' '}
                //     imageSrc={farm.image && `${API_URL}/assets/${farm.image}`}
                // />
            )}
        </CardLayout>
    )
}

