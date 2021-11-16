import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProtectedRoute from './ProtectedRoute';
import Auth from './Auth';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/Signup';
import BackOfficePage from '../pages/BackOffice';

import { selectStore } from '../redux/features/storeSlice';

const App = () => {
  const store = useSelector(selectStore);
  const [rootPath, setRootPath] = useState('/locating-store');

  useEffect(() => {
    setRootPath(`/${store.store_url}`);
  }, [store]);

  return (
    <Router>
      <Auth>
        <Switch>
          <ProtectedRoute path={rootPath} component={BackOfficePage} />
          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/signup" component={SignUpPage} />
          <Route path="*" component={BackOfficePage} />
        </Switch>
      </Auth>
    </Router>
  );
};

export default App;
