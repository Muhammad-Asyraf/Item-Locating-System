import React, { useRef, useEffect } from 'react';

import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles(() => ({
  inputFields: {
    width: '100%',
  },
}));

const AccountForm = (props) => {
  const classes = useStyles();
  const storeUrlRef = useRef();
  const passwordRef = useRef();
  const { handleNext, stepsData, setStepsData, setError, formRef, checkStoreUrlExist } = props;

  const handleGate = (newStepsData, direction) => {
    const { storeUrl, storeAddress } = newStepsData;
    const { error: storeUrlError } = storeUrl;
    const { error: storeAddressError } = storeAddress;

    if (storeUrlError || storeAddressError) {
      setError(true);
    } else {
      setError(false);
      if (direction === 'forward') {
        handleNext(newStepsData);
      }
    }
  };

  const validateStoreUrl = async (currentStepsData, direction = false) => {
    const { value } = storeUrlRef.current;
    let newStepsData = {};
    let storeUrlExist;

    if (direction === 'forward' && value) {
      storeUrlExist = await checkStoreUrlExist(storeUrlRef.current.value);
    }

    if (!value) {
      newStepsData = {
        ...currentStepsData,
        storeUrl: {
          value,
          error: "Please enter your preferred store's URL",
        },
      };
    } else if (storeUrlExist && value) {
      newStepsData = {
        ...currentStepsData,
        storeUrl: {
          value,
          error: "Store's URL already exist",
        },
      };
    } else {
      newStepsData = {
        ...currentStepsData,
        storeUrl: {
          value,
          error: false,
        },
      };
    }

    return newStepsData;
  };

  const validatePassword = (currentStepsData) => {
    const { value } = passwordRef.current;
    let newStepsData = {};

    if (!value) {
      newStepsData = {
        ...currentStepsData,
        password: {
          ...currentStepsData.password,
          value,
          error: "Please set your account's password",
        },
      };
    } else {
      newStepsData = {
        ...currentStepsData,
        password: {
          ...currentStepsData.password,
          value,
          error: false,
        },
      };
    }

    return newStepsData;
  };

  const handleValidation = async (e, { sequentialValidation, direction } = {}) => {
    let newStepsData = {};

    if (sequentialValidation) {
      newStepsData = validatePassword(stepsData);
      newStepsData = await validateStoreUrl(newStepsData, direction);
    } else {
      const { id: target } = e.target;
      if (target === 'storeUrl') {
        newStepsData = await validateStoreUrl(stepsData);
      } else if (target === 'password') {
        newStepsData = validatePassword(stepsData);
      }
    }

    setStepsData(newStepsData);
    handleGate(newStepsData, direction);
  };

  const handleShowPassword = () => {
    setStepsData({
      ...stepsData,
      password: {
        ...stepsData.password,
        showPassword: !stepsData.password.showPassword,
      },
    });
  };

  useEffect(() => {
    formRef.current = handleValidation;
  }, []);

  return (
    <>
      <Grid item sm={6}>
        <TextField
          id="storeUrl"
          label="Store URL"
          variant="outlined"
          color="gradient"
          defaultValue={stepsData.storeUrl.value}
          onChange={(e) => handleValidation(e)}
          onBlur={(e) => handleValidation(e)}
          error={stepsData.storeUrl.error !== false}
          helperText={
            stepsData.storeUrl.error
              ? stepsData.storeUrl.error
              : 'Please enter your preferred store URL'
          }
          inputRef={storeUrlRef}
          className={classes.inputFields}
          InputProps={{
            startAdornment: <InputAdornment position="start">loketla.com.my/</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          id="password"
          label="Password"
          type={stepsData.password.showPassword ? 'text' : 'password'}
          variant="outlined"
          color="gradient"
          defaultValue={stepsData.password.value}
          onChange={(e) => handleValidation(e)}
          onBlur={(e) => handleValidation(e)}
          error={stepsData.password.error !== false}
          helperText={
            stepsData.password.error ? stepsData.password.error : 'Please enter your password'
          }
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
                  {stepsData.password.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </>
  );
};

export default AccountForm;
