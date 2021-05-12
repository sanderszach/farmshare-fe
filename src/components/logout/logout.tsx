import React from 'react'
import styled from 'styled-components'

const removeToken = () => {
    sessionStorage.removeItem('token');
    window.location.reload(); 
}

const StyledLogout = styled.span`
    cursor: pointer;
    float: right;
    top: 10px;
    right: 5px;
`

export const Logout:React.FC = () => {
    return(
        <StyledLogout className="k-icon k-i-logout" onClick={removeToken}></StyledLogout>
    )
}