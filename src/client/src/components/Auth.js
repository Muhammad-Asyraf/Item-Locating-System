import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';
// import CircularProgress from '@mui/material/CircularProgress';

import { auth } from '../services/firebase';
import {
  setActiveUser,
  verifying,
  verified,
  clearState,
  selectAuthIsLoading,
} from '../redux/features/authSlice';
import { processed as processedStore } from '../redux/features/storeSlice';
import getStore from '../redux/thunks/storeThunk';
// import { setHeader } from '../redux/thunks/authThunk';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

/* eslint-disable react/prop-types */
const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const authLoading = useSelector(selectAuthIsLoading);
  const navigate = useNavigate();
  const location = useLocation();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    dispatch(verifying());
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await dispatch(
          setActiveUser({
            user: user.toJSON(),
            message: 'Successfully set active user',
            status: 'ok',
          })
        );

        const {
          type,
          payload: { data },
        } = await dispatch(getStore({ userUUID: user.toJSON().uid }));

        if (type.includes('fulfilled')) {
          localStorage.setItem('storeUUID', data.uuid);
          localStorage.setItem('storeUrl', data.store_url);
          localStorage.setItem('storeName', data.store_name);
        }

        dispatch(processedStore());

        if (location.pathname === '/auth/login') {
          const storeUrl = localStorage.getItem('storeUrl');
          navigate(`/${storeUrl}/product/list`);
        }
      }
      dispatch(clearState());
      dispatch(verified());
      setFirstRender(false);
    });

    return unsubscribe;
  }, []);

  if (authLoading && firstRender) {
    return (
      <div className={classes.root}>
        <LinearProgress
          sx={{
            height: 6,
            backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)',
          }}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default Auth;
