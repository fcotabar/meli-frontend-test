import React from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Home } from '../components/Home';

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/items/:id" component={Home} />
          <Route exact path="/items" component={Home} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
