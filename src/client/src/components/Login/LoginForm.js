import React, { useState, useRef } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import Grid from '@mui/material/Grid';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

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
    backgroundColor: '#003366',

    marginTop: '15px',
    borderRadius: '10px',
    boxShadow: 'rgb(30 136 229 / 24%) 0px 8px 16px 0px !important',
  },
  inputFields: {
    width: '100%',
  },
  // noBorder: {
  //   boxShadow: '0 1px 4px 0 rgba(35,35,35,.16) !important',
  //   border: 'none !important',
  // },
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
      <Grid container spacing={2} style={{ marginTop: '0px' }}>
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
            InputProps={{
              classes: { notchedOutline: classes.noBorder },
            }}
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
              classes: { notchedOutline: classes.noBorder },
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
            sx={{ mt: 3 }}
          >
            {authLoading ? (
              <CircularProgress size={20} sx={{ color: '#003366 !important' }} />
            ) : (
              <>Sign Ins</>
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default LoginForm;
