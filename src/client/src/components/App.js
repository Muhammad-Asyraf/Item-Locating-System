import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProtectedRoute from './ProtectedRoute';
import Auth from './Auth';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/Signup';
import BackOfficePage from '../pages/BackOffice';
import NotFoundPage from '../pages/NotFound';

import { selectStore } from '../redux/features/storeSlice';

const App = () => {
  const store = useSelector(selectStore);
  const [rootPath, setRootPath] = useState('/default');

  useEffect(() => {
    setRootPath(`/${store.store_url}`);
    console.log('im called');
  }, [store]);

  console.log('inside app', rootPath);
  return (
    <Router>
      <Auth>
        <Switch>
          <ProtectedRoute path={rootPath} component={BackOfficePage} />
          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/signup" component={SignUpPage} />
          <Redirect from="/" to={`${rootPath}/dashboard`} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Auth>
    </Router>
  );
};

export default App;
