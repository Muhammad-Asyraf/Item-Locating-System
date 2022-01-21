import React from 'react';

import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import { selectIsAuthenticated } from '../redux/features/authSlice';

import routes from '../pages/Routes';

const Routing = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const storeUrl = localStorage.getItem('storeUrl');

  const routing = useRoutes(routes(isAuthenticated, storeUrl));

  return <>{routing}</>;
};

export default Routing;
