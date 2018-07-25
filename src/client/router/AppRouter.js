import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../components/Landing';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Chat from '../components/Chat';
import CreateRoom from '../components/CreateRoom';

const AppRouter = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/chat/create" component={CreateRoom} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
