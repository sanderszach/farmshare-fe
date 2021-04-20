import React, { Children, useEffect, useState } from 'react'
import { Card as KendoCard, CardHeader, CardTitle, CardImage, CardSubtitle, CardBody } from '@progress/kendo-react-layout';
import styled from 'styled-components'
import { CardWidth } from './types/card.types';

interface OwnProps {
    title?: string
    subtitle?: string
    imageSrc?: string
    width?: number
    handleClick?: (e:React.MouseEventHandler<HTMLButtonElement>) => any
}

export const Card:React.FC<OwnProps> = (props) => {
    const { title, subtitle, imageSrc, width, handleClick, children } = props

    return(
        <CardWrapper onClick={handleClick}>
            <StyledCard width={width}>
                <CardHeader>
                    <CardTitle>
                        {title || ''}
                    </CardTitle>
                    {subtitle &&
                        <CardSubtitle>
                            {subtitle}
                        </CardSubtitle>
                    }
                </CardHeader>
                {imageSrc && <CardImage src={imageSrc} />}
                {children &&
                    <CardBody>
                        {children}
                    </CardBody>
                }
            </StyledCard>
        </CardWrapper>
    )
}

const StyledCard = styled(KendoCard)<{width?:CardWidth}>`
    height: 250px;
    ${(props) => props.width && `width: ${props.width.toString()}px;`}
`
StyledCard.defaultProps = {width:CardWidth.normal}

const CardWrapper = styled.div<{onClick?}>`
    ${(props) => props.onClick && `cursor: pointer;`}
    margin: 20px;
`

export const CardLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
`

