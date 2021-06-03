import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import { auth } from '../firebase';
import {
  setActiveUser,
  setHeader,
  verified,
  selectAuthIsLoading,
} from '../redux/features/authSlice';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  circular: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  },
});

/* eslint-disable react/prop-types */
const Auth = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authLoading = useSelector(selectAuthIsLoading);
  const history = useHistory();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setActiveUser(user.toJSON()));
        await dispatch(setHeader(auth));
        if (history.location.pathname === '/auth/login') {
          history.push('/dashboard');
        }
      }
      dispatch(verified());
      setFirstRender(false);
      unsubscribe();
    });
  }, []);

  if (authLoading && firstRender) {
    return (
      <div className={classes.root}>
        <LinearProgress color="secondary" />
        {/* <div className={classes.circular}>
          <CircularProgress size={70} color="secondary" />
        </div> */}
      </div>
    );
  }

  return <>{children}</>;
};

export default Auth;
