import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { Dashboard } from './pages';
import { Login, PageWrapper } from './components';
import useToken from './useToken';
import { Farms } from './pages/farms/farms';
import { Farm } from './pages/farms/farm/farm';
import { DrawerRouterContainer } from './components/drawer-router-container/drawer-router-container';

function App() {
  const { token, setToken } = useToken();
  
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <DrawerRouterContainer>
      <PageWrapper>
        <Router>
          <Switch>
            <Route path="/farms/:farmId" component={Farm} />
          </Switch>
          <Switch>
            <Route exact path="/test" component={Farm} />
          </Switch>
          <Switch>
            <Route exact path="/farms" component={Farms} />
          </Switch>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />        
          </Switch>
        </Router>
      </PageWrapper>
    </DrawerRouterContainer>

  );


}

export default App;
