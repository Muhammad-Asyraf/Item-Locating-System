import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import SignupForm from '../components/Signup/SignupForm';

import {
  // setHeader,
  verified,
  signup,
  selectAuthMessage,
  selectAuthIsLoading,
} from '../redux/features/authSlice';

const useStyles = makeStyles((theme) => ({
  card: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '40%',
    minWidth: '376px',
    maxHeight: '650px',
    borderRadius: '8px',
  },
  cardContent: {
    flexGrow: 1,
    marginLeft: '20px',
    marginRight: '20px',
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const authErrors = useSelector(selectAuthMessage);
  const authLoading = useSelector(selectAuthIsLoading);

  const signupHandler = async (data) => {
    const { type } = await dispatch(signup(data));

    if (type.includes('fulfilled')) {
      history.push('/dashboard');
    }
    dispatch(verified());
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
          backgroundColor: 'rgb(246, 248, 251)',
          // backgroundColor: '#0984e3',
        }}
      >
        <Card elevation={2} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <h1
                  style={{
                    marginTop: '30px',
                    marginBottom: '10px',
                    fontSize: '35px',
                  }}
                >
                  <span style={{ color: '#007AFF' }}>LOKETLA</span> Sign Up
                </h1>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: '10px' }}>
                {authErrors.length !== 0 && (
                  <Alert style={{ borderRadius: '8px' }} severity="error">
                    {authErrors}
                  </Alert>
                )}
              </Grid>
              <SignupForm onSignup={signupHandler} authLoading={authLoading} />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
export default Login;
