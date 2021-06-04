import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { auth } from '../firebase';
import {
  verified,
  login,
  selectAuthMessage,
  selectAuthIsLoading,
} from '../redux/features/authSlice';

const useStyles = makeStyles((theme) => ({
  card: {
    '& > *': {
      margin: theme.spacing(1),
    },
    // minWidth: 275,
    width: 500,
    borderRadius: '10px',
  },
  form: {
    '& > *': {
      marginTop: '20px',
      marginBottom: '20px',
      '& fieldset': {
        borderRadius: '8px',
      },
    },
    width: '100%',
  },
  submitButton: {
    height: '55px',
    width: '100%',
    color: 'white',
    marginTop: '15px',
    borderRadius: '10px',
    boxShadow: 'rgb(30 136 229 / 24%) 0px 8px 16px 0px',
  },
  inputFields: {
    width: '100%',
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const initInput = {
    error: false,
    value: '',
  };

  const [email, setEmail] = useState(initInput);
  const [password, setPassword] = useState({ ...initInput, showPassword: false });

  const authErrors = useSelector(selectAuthMessage);
  const authLoading = useSelector(selectAuthIsLoading);

  const emailRef = useRef();
  const passwordRef = useRef();

  const validateEmail = () => {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))*$/;

    const value = emailRef.current.value.trim().toLowerCase();
    const isValidEmail = reg.test(value);

    if (!emailRef.current.value) {
      setEmail({
        ...email,
        error: 'Email is required',
      });
    } else if (!isValidEmail) {
      setEmail({
        ...email,
        error: 'Email must be a valid email address',
      });
    } else {
      setEmail({
        ...email,
        error: false,
        value: emailRef.current.value,
      });
    }
  };

  const validatePassword = () => {
    if (!passwordRef.current.value) {
      setPassword({
        ...password,
        error: 'Password is required',
      });
    } else {
      setPassword({
        ...password,
        error: false,
        value: passwordRef.current.value,
      });
    }
  };

  const handleShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (email.value && password.value) {
      const { type } = await dispatch(
        login({ firebase: auth, email: email.value, password: password.value })
      );

      if (type.includes('fulfilled')) {
        history.push('/dashboard');
      }

      dispatch(verified());
    }
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
          backgroundColor: '#0984e3',
        }}
      >
        <Card elevation={5} className={classes.card}>
          <CardContent style={{ marginLeft: '20px', marginRight: '20px' }}>
            <Grid item xs={12}>
              <h1 style={{ marginTop: '30px', fontSize: '35px' }}>
                <span style={{ color: '#0984e3' }}>LOKETLA</span> Login
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
              <form
                className={classes.form}
                onSubmit={handleSubmit}
                autoComplete="on"
              >
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    onBlur={validateEmail}
                    onChange={validateEmail}
                    error={email.error}
                    helperText={email.error}
                    inputRef={emailRef}
                    className={classes.inputFields}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type={password.showPassword ? 'text' : 'password'}
                    onBlur={validatePassword}
                    onChange={validatePassword}
                    error={password.error}
                    helperText={password.error}
                    inputRef={passwordRef}
                    className={classes.inputFields}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            onMouseDown={handleShowPassword}
                          >
                            {password.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={authLoading || email.error || password.error}
                    className={classes.submitButton}
                  >
                    {authLoading ? (
                      <CircularProgress size={20}> </CircularProgress>
                    ) : (
                      <>Sign In</>
                    )}
                  </Button>
                </Grid>
              </form>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
export default Login;
