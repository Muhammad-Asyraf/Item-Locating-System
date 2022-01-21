import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { useNavigate, Link } from 'react-router-dom';

// import IconButton from '@mui/material/IconButton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
// import EditRoundedIcon from '@mui/icons-material/EditRounded';

import { makeStyles } from '@mui/styles';

import getStore from '../../redux/thunks/storeThunk';
import {
  processingRequest,
  processed,
  selectStore,
  selectIsLoading,
} from '../../redux/features/storeSlice';
import { selectUser as selectAuthUser } from '../../redux/features/authSlice';

import StoreInfo from '../../components/Stores/StoreInfo';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  linear: {
    position: 'relative',
    top: '10px !important',
    left: '-45px !important',
    width: '100vw',
    height: '7px !important',
  },
}));

const StoreDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const authUser = useSelector(selectAuthUser);
  const currentStore = useSelector(selectStore);
  const isStoreLoading = useSelector(selectIsLoading);

  useEffect(async () => {
    dispatch(processingRequest());
    await dispatch(getStore({ userUUID: authUser.uid }));
    dispatch(processed());
  }, []);

  if (isStoreLoading) {
    return (
      <div>
        <LinearProgress
          className={classes.linear}
          sx={{
            backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
          }}
        />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: '50px' }}>
        <Grid item xs={0.65} />
        <Grid item xs={7} container>
          <Grid item xs={8}>
            <h1 style={{ marginBottom: 1, marginTop: 3, fontSize: '2em' }}>
              <span>Store</span>
              {/* <IconButton
                component={Link}
                to={`/${storeUrl}/store/edit/${authUser.uid}`}
                onClick={() => {
                  dispatch(processingRequest());
                }}
                sx={{ position: 'relative', top: -3, left: 5 }}
              >
                <EditRoundedIcon fontSize="large" color="primary" />
              </IconButton> */}
            </h1>
            <Breadcrumbs separator="•" aria-label="breadcrumb">
              <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
              <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Store&nbsp;&nbsp;</div>,
              <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Details</div>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <StoreInfo store={currentStore} />
        </Grid>
      </Grid>
    </div>
  );
};

export default StoreDetail;
