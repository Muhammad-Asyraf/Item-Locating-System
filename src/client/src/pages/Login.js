import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';

import LoginForm from '../components/Login/LoginForm';

import { auth } from '../services/firebase';
import {
  verified,
  clearState,
  selectAuthMessage,
  selectAuthIsLoading,
} from '../redux/features/authSlice';

import { login } from '../redux/thunks/authThunk';

const useStyles = makeStyles((theme) => ({
  card: {
    '& > *': {
      margin: theme.spacing(1),
    },
    // minWidth: 275,
    [theme.breakpoints.up('sm')]: {
      width: '70% !important',
    },
    width: '80%',
    margin: 'auto',
    borderRadius: '10px !important',
  },
  cardContent: {
    margin: '20px 20px',
    [theme.breakpoints.up('sm')]: {
      padding: '20px 30px !important',
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authErrors = useSelector(selectAuthMessage);
  const authLoading = useSelector(selectAuthIsLoading);

  const loginHandler = async (email, password) => {
    const {
      type,
      payload: { StoreURL },
    } = await dispatch(login({ firebase: auth, email, password }));

    if (type.includes('fulfilled')) {
      dispatch(clearState());

      navigate(`/${StoreURL}/product/list`);
    }
    dispatch(verified());
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          minHeight: '100vh',
          // backgroundColor: '#003366',
        }}
      >
        <div
          style={{
            display: 'block',
            position: 'absolute',
            zIndex: '-10',
            boxSizing: 'border-box',
            height: '100%',
            width: '100%',
            backgroundColor: '#003366',
            // backgroundColor: '#dc3d4b',
            clipPath: 'ellipse(93% 100% at 82.25% 0%)',
          }}
        />
        <Grid item sm={3}>
          <Card elevation={15} className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Grid item xs={12}>
                <h1 style={{ fontSize: '35px' }}>
                  <span style={{ color: '#007FFF' }}>LOKETLA</span> Login
                </h1>
              </Grid>
              <Grid item xs={12}>
                {authErrors.length !== 0 && (
                  <Alert style={{ borderRadius: '8px' }} severity="error">
                    {authErrors}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <LoginForm onLogin={loginHandler} authLoading={authLoading} />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default Login;
