import React from 'react'
import styled from 'styled-components'

export const DataValue:React.FC<{label:string}> = (props) => {
    return(
        <StyledDataValue>
            <StyledLabel>{props.label}: </StyledLabel><span>{props.children}</span>
        </StyledDataValue>
    )
}

export const StyledDataValue = styled.div`
    padding: 5px 0;
`

const StyledLabel = styled.label`
    font-weight:700;
`