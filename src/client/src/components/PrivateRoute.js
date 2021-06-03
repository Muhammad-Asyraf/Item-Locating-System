import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../redux/features/authSlice';

/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
export default function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        );
      }}
    />
  );
}
