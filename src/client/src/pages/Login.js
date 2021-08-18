import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from '../components/Login/LoginForm';

import { auth } from '../firebase';
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
    width: 500,
    borderRadius: '8px',
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const authErrors = useSelector(selectAuthMessage);
  const authLoading = useSelector(selectAuthIsLoading);

  const loginHandler = async (email, password) => {
    const { type } = await dispatch(login({ firebase: auth, email, password }));

    if (type.includes('fulfilled')) {
      dispatch(clearState());
      history.push('/store-slug/dashboard');
    }
    dispatch(verified());
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          minHeight: '100vh',
          backgroundColor: 'rgb(246, 248, 251)',
          // backgroundColor: '#007AFF',
        }}
      >
        <Card elevation={1} className={classes.card}>
          <CardContent style={{ marginLeft: '20px', marginRight: '20px' }}>
            <Grid item xs={12}>
              <h1 style={{ marginTop: '30px', fontSize: '35px' }}>
                <span style={{ color: '#007AFF' }}>LOKETLA</span> Login
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
    </>
  );
};
export default Login;
