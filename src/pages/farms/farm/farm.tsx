import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PageWrapper } from '../../../components';
import { farmsService } from '../../../services'
import { Farm as IFarm } from '../../../types'

const API_URL = process.env.REACT_APP_API_URL

export const Farm:React.FC = () =>{
    const { farmId } = useParams<{farmId:string}>()
    const [farm, setFarm] = useState<IFarm>({})
    useEffect(() => {
        farmsService.getFarms(setFarm,farmId)
    },[''])

    return(
        <div>
            <StyledBanner src={`${API_URL}/assets/${farm.image}`} />
            <HeaderWrapper>
                <h1>{farm.name}</h1>
                <p>{farm.address}, {farm.city}, {farm.state}</p>
            </HeaderWrapper>
        </div>
    )
}

const StyledBanner = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
`

const HeaderWrapper = styled.div`
    padding: 20px;
`