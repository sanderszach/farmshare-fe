import React, { useEffect } from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { Dashboard, EaterGroup, EaterGroups } from './pages';
import { Login, PageWrapper } from './components';
import useToken from './useToken';
import { Farms } from './pages/farms/farms';
import { Farm } from './pages/farms/farm/farm';
import { DrawerRouterContainer } from './components/drawer-router-container/drawer-router-container';
import { UserContextProvider } from './contexts'
import { Account } from './pages/account/account';

function App() {
  const { token, setToken } = useToken();
  
  console.log(token)

  if(!token) {
    return <Login setToken={setToken} />
  } else {
    return (
      <UserContextProvider>
        <DrawerRouterContainer>
          <PageWrapper>
            <Router>
              <Switch>
                <Route path="/farms/:farmId" component={Farm} />
              </Switch>
              <Switch>
                <Route path="/eatergroups/:eaterGroupId" component={EaterGroup} />
              </Switch>
              <Switch>
                <Route exact path="/eatergroups" component={EaterGroups} />
              </Switch>
              <Switch>
                <Route exact path="/farms" component={Farms} />
              </Switch>
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />        
              </Switch>
              <Switch>
                <Route exact path="/account" component={Account} />        
              </Switch>
            </Router>
          </PageWrapper>
        </DrawerRouterContainer>
      </UserContextProvider>
    );
  }



}

export default App;
