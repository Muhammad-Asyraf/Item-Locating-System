import React, { useState, useRef } from 'react';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import Grid from '@material-ui/core/Grid';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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

const LoginForm = (props) => {
  const classes = useStyles();
  const { onLogin, authLoading } = props;

  const initInput = {
    error: false,
    value: '',
  };

  const [email, setEmail] = useState({ ...initInput, blurOnce: false });
  const [password, setPassword] = useState({ ...initInput, showPassword: false });

  const emailRef = useRef();
  const passwordRef = useRef();

  /* eslint-disable no-useless-escape */
  const validateEmail = (outOfFocus = false) => {
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))*$/;

    const value = emailRef.current.value.trim().toLowerCase();
    const isValidEmail = reg.test(value);

    if (emailRef.current.value && outOfFocus === true && email.blurOnce === false) {
      setEmail({
        ...email,
        blurOnce: true,
        error: !isValidEmail ? 'Email must be a valid email address' : false,
      });
    } else if (!emailRef.current.value) {
      setEmail({
        ...email,
        error: 'Email is required',
      });
    } else if (!isValidEmail && email.blurOnce === true) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (email.value && password.value) {
      onLogin(email.value, password.value);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit} autoComplete="on">
      <Grid item xs={12}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          onBlur={() => validateEmail(true)}
          onChange={validateEmail}
          error={email.error !== false}
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
          error={password.error !== false}
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
                  {password.showPassword ? <Visibility /> : <VisibilityOff />}
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
          disabled={
            authLoading === true || email.error !== false || password.error !== false
          }
          className={classes.submitButton}
        >
          {authLoading ? <CircularProgress size={20}> </CircularProgress> : <>Sign In</>}
        </Button>
      </Grid>
    </form>
  );
};
export default LoginForm;
