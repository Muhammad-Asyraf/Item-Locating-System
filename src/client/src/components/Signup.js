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
    borderRadius: '10px',
  },
  cardContent: {
    flexGrow: 1,
    marginLeft: '20px',
    marginRight: '20px',
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
  noPadding: {
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const authErrors = useSelector(selectAuthMessage);
  const authLoading = useSelector(selectAuthIsLoading);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(firstName);
    console.log(lastName);

    if (password === confirmPassword) {
      console.log('Same');
    }
    const { type } = await dispatch(signup({ firebase: auth, email, password }));

    if (type.includes('fulfilled')) {
      history.push('/dashboard');
    }
    dispatch(verified());
  };

  const onChangeFirstName = () => {
    setFirstName(firstNameRef.current.value);
  };

  const onChangeLastName = () => {
    setLastName(lastNameRef.current.value);
  };

  const onChangeEmail = () => {
    setEmail(emailRef.current.value);
  };
  const onChangePassword = () => {
    setPassword(passwordRef.current.value);
  };

  const onChangeConfirmPassword = () => {
    setConfirmPassword(confirmPasswordRef.current.value);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          backgroundColor: '#0984e3',
        }}
      >
        <Card elevation={5} className={classes.card}>
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
                  <span style={{ color: '#0984e3' }}>LOKETLA</span> Sign Up
                </h1>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: '10px' }}>
                {authErrors.length !== 0 && (
                  <Alert style={{ borderRadius: '8px' }} severity="error">
                    {authErrors}
                  </Alert>
                )}
              </Grid>
              <form
                className={classes.form}
                onSubmit={handleSubmit}
                autoComplete="on"
                style={{ flexGrow: 1 }}
              >
                <Grid container spacing={2} style={{ marginTop: '0px' }}>
                  <Grid item sm={12} md={6} style={{ width: '100%' }}>
                    <TextField
                      id="firstName"
                      label="First Name"
                      variant="outlined"
                      onChange={onChangeFirstName}
                      inputRef={firstNameRef}
                      className={classes.inputFields}
                    />
                  </Grid>
                  <Grid item sm={12} md={6} style={{ width: '100%' }}>
                    <TextField
                      id="lastName"
                      label="Last Name"
                      variant="outlined"
                      onChange={onChangeLastName}
                      inputRef={lastNameRef}
                      className={classes.inputFields}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      onChange={onChangeEmail}
                      inputRef={emailRef}
                      className={classes.inputFields}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="password"
                      label="Password"
                      variant="outlined"
                      type={showPassword ? 'text' : 'password'}
                      onChange={onChangePassword}
                      inputRef={passwordRef}
                      className={classes.inputFields}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="confirmPassword"
                      label="Confirm Password"
                      variant="outlined"
                      type={showConfirmPassword ? 'text' : 'password'}
                      onChange={onChangeConfirmPassword}
                      inputRef={confirmPasswordRef}
                      className={classes.inputFields}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownConfirmPassword}
                            >
                              {showConfirmPassword ? (
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
                      disabled={authLoading}
                      className={classes.submitButton}
                    >
                      {authLoading ? (
                        <CircularProgress size={20}> </CircularProgress>
                      ) : (
                        <>Sign In</>
                      )}
                    </Button>
                  </Grid>
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
