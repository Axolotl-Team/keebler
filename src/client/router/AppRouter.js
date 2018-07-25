import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../components/Landing';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Chat from '../components/Chat';

const AppRouter = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/chat" component={Chat} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
