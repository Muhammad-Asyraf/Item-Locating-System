import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Auth from './Auth';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/Signup';
import BackOfficePage from '../pages/BackOffice';
import NotFoundPage from '../pages/NotFound';

const App = () => (
  <Router>
    <Auth>
      <Switch>
        <ProtectedRoute path="/store-slug" component={BackOfficePage} />
        <Route path="/auth/login" component={LoginPage} />
        <Route path="/auth/signup" component={SignUpPage} />
        <Redirect from="/" to="/store-slug" />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Auth>
  </Router>
);

export default App;
