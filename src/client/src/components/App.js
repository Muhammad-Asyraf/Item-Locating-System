import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import store from '../redux/store';
import Login from './Login';
import SignUp from './Signup';
import Dashboard from './dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Auth from './Auth';

const App = () => (
  <Provider store={store}>
    <Router>
      <Auth>
        <Switch>
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/signup" component={SignUp} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Auth>
    </Router>
  </Provider>
);

export default App;
