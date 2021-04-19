import React, { useState } from 'react'
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons'
import styled from 'styled-components';
import { theme } from '../../theme';

interface OwnProps {}

export const DrawerRouterContainer:React.FC<OwnProps> = (props) => {
    const [expanded, setExpanded] = useState(true)

    const items = [
        { text: 'Farms', icon: 'k-i-inbox', route: '/farms' },
        { separator: true },
        { text: 'Dashboard', icon: 'k-i-bell', route: '/dashboard' },
    ];

    const onSelect = (e) => {
        setExpanded(false)
        window.location.href=e.itemTarget.props.route
    }
    const handleClick = () => setExpanded(!expanded)

    return(
        <div>
            <Toolbar>
                <Button icon="menu" look="flat" onClick={handleClick} />
            </Toolbar>
            <StyledDrawer
                expanded={expanded}
                position={'start'}
                mode={'push'}
                mini={true}
                items={items}
                onSelect={onSelect}
            >
                <DrawerContent>
                    {props.children}
                </DrawerContent>
            </StyledDrawer>
        </div>
    )
}

const Toolbar = styled.div`
    background-color:${theme.colors.grey.light}
`

const StyledDrawer = styled(Drawer)`
    height:calc(100vh - 36px);
`