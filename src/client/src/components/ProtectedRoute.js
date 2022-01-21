import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../redux/features/authSlice';

/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
const ProtectedRoute = ({ element: Component, path: protectedPath }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  console.log('Component', Component);
  console.log('protectedPath', protectedPath);

  return (
    <Route
      path={protectedPath}
      element={isAuthenticated ? <Component /> : <Navigate to="/auth/login" />}
    />
  );
};

export default ProtectedRoute;
