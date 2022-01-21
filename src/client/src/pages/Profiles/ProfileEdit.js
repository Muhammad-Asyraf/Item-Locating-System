import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import axios from 'axios';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import { makeStyles } from '@mui/styles';

import { getUser, updateUser } from '../../redux/thunks/userThunk';
import {
  processingRequest,
  processed,
  selectUser,
  selectIsLoading,
} from '../../redux/features/userSlice';
import { setActiveUser } from '../../redux/features/authSlice';
import { setNewNotification } from '../../redux/features/notificationSlice';

import UserProfileEdit from '../../components/Profiles/UserProfileEdit';

import { auth } from '../../services/firebase';

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

const ProfileEdit = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    match: {
      params: { uuid },
    },
  } = props;

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const [firstRefresh, setFirstRefresh] = useState(true);

  const currentUser = useSelector(selectUser);
  const isUserLoading = useSelector(selectIsLoading);

  useEffect(async () => {
    dispatch(processingRequest());
    await dispatch(getUser({ uuid }));
    dispatch(processed());
    setFirstRefresh(false);
  }, []);

  const handleSubmit = async (payload) => {
    const { type, payload: resPayload } = await dispatch(updateUser({ uuid, payload }));

    if (type.includes('fulfilled')) {
      const password = payload.changePasswordRequest
        ? payload.newPassword
        : payload.currentPassword;

      const { user } = await auth.signInWithEmailAndPassword(payload.email, password);

      dispatch(
        setActiveUser({
          user: user.toJSON(),
          message: 'Successfully set active user',
          status: 'ok',
        })
      );

      navigate(`/${storeUrl}/profile`);

      await dispatch(
        setNewNotification({
          message: 'User successfully updated',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    } else if (type.includes('rejected')) {
      await dispatch(
        setNewNotification({
          message: resPayload.message,
          backgroundColor: '#be0000',
          severity: 'error',
        })
      );
    }
    dispatch(processed());
  };

  const checkEmailExist = async (email) => {
    const userEndpoint = `/api/backoffice/user-service/user/email/${email}`;
    let emailExist = false;

    try {
      dispatch(processingRequest());
      const { data } = await axios.get(userEndpoint);

      if (data.length > 0) {
        const [fetchedUser] = data;

        if (fetchedUser.uuid !== currentUser.uuid) {
          emailExist = true;
        }
      }

      dispatch(processed());
    } catch (err) {
      console.log('error', err);
    }

    return emailExist;
  };

  if (isUserLoading && firstRefresh) {
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
          <Grid item xs={12}>
            <h1 style={{ marginBottom: 1, marginTop: 3, fontSize: '2em' }}>
              <span>Edit Profile</span>
              <IconButton
                component={Link}
                to={`/${storeUrl}/profile`}
                sx={{ position: 'relative', top: -3, left: 5 }}
              >
                <KeyboardReturnRoundedIcon fontSize="large" color="primary" />
              </IconButton>
            </h1>
            <Breadcrumbs separator="•" aria-label="breadcrumb">
              <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
              <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;User&nbsp;&nbsp;</div>,
              <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Profile&nbsp;&nbsp;</div>
              <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;{uuid}</div>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid
          item
          xs={3.8}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            form="profile-form"
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              textTransform: 'none',
              fontSize: '0.95rem',
              borderRadius: 3,
              width: 105,
              height: 50,
              paddingRight: 2.5,
              boxShadow: 'rgba(53, 132, 167, 0.44) 0px 8px 16px 0px !important',
            }}
          >
            {isUserLoading ? (
              <CircularProgress size={25} style={{ color: 'white' }} />
            ) : (
              <>
                <SaveRoundedIcon style={{ marginRight: 10 }} fontSize="small" /> Save
              </>
            )}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <UserProfileEdit
            user={currentUser}
            checkEmailExist={checkEmailExist}
            onSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileEdit;
