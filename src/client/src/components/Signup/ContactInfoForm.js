import React, { useRef, useEffect } from 'react';
// import React, { useState, useRef } from 'react';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles(() => ({
  inputFields: {
    width: '100%',
  },
}));

const ContactInfoForm = (props) => {
  const classes = useStyles();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const { handleNext, stepsData, setStepsData, setError, formRef, checkEmailExist } =
    props;

  const handleGate = ({ email, phoneNumber }, direction) => {
    const { error: emailError } = email;
    const { error: phoneNumberError } = phoneNumber;

    if (emailError || phoneNumberError) {
      setError(true);
    } else {
      setError(false);
      if (direction === 'forward') {
        handleNext();
      }
    }
  };

  /* eslint-disable no-useless-escape */
  const validateEmail = async (
    outOfFocus = false,
    currentStepsData,
    direction = false
  ) => {
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))*$/;

    const value = emailRef.current.value.trim().toLowerCase();
    const isValidEmail = reg.test(value);
    const oldEmail = currentStepsData.email;
    let emailExist = false;
    let newStepsData;

    if (direction === 'forward' && isValidEmail) {
      emailExist = await checkEmailExist(emailRef.current.value);
    }

    if (emailRef.current.value && outOfFocus && oldEmail.blurOnce === false) {
      newStepsData = {
        ...currentStepsData,
        email: {
          ...oldEmail,
          blurOnce: true,
          error: !isValidEmail ? 'Email must be a valid email address' : false,
        },
      };
    } else if (!emailRef.current.value) {
      newStepsData = {
        ...currentStepsData,
        email: {
          ...oldEmail,
          error: 'Email is required',
        },
      };
    } else if (!isValidEmail && oldEmail.blurOnce === true) {
      newStepsData = {
        ...currentStepsData,
        email: {
          ...oldEmail,
          error: 'Email must be a valid email address',
        },
      };
    } else if (emailExist && isValidEmail) {
      newStepsData = {
        ...currentStepsData,
        email: {
          ...oldEmail,
          value: emailRef.current.value,
          error: 'Email address already has been used by other account',
        },
      };
    } else {
      newStepsData = {
        ...currentStepsData,
        email: {
          ...oldEmail,
          error: false,
          value: emailRef.current.value,
        },
      };
    }

    return newStepsData;
  };

  const validatePhoneNumber = (currentStepsData) => {
    const { value } = phoneNumberRef.current;

    const reg = /^(01)[0-46-9]*[0-9]{7,8}$/;
    const isValidPhoneNumber = reg.test(value);
    let newStepsData = {};

    if (!value) {
      newStepsData = {
        ...currentStepsData,
        phoneNumber: {
          value,
          error: 'Please enter your phone number',
        },
      };
    } else if (!isValidPhoneNumber) {
      newStepsData = {
        ...currentStepsData,
        phoneNumber: {
          value,
          error: "Invalid Malaysia's phone number",
        },
      };
    } else {
      newStepsData = {
        ...currentStepsData,
        phoneNumber: {
          value,
          error: false,
        },
      };
    }

    return newStepsData;
  };

  const handleValidation = async (
    e,
    { outOfFocus, sequentialValidation, direction } = {}
  ) => {
    let newStepsData = {};

    if (sequentialValidation) {
      newStepsData = validatePhoneNumber(stepsData);
      newStepsData = await validateEmail(outOfFocus, newStepsData, direction);
    } else {
      const { id: data } = e.target;
      if (data === 'phoneNumber') {
        newStepsData = validatePhoneNumber(stepsData);
      } else if (data === 'email') {
        newStepsData = await validateEmail(outOfFocus, stepsData);
      }
    }

    setStepsData(newStepsData);
    handleGate(newStepsData, direction);
  };

  useEffect(() => {
    formRef.current = handleValidation;
  }, []);

  return (
    <>
      <Grid item sm={6}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          color="gradient"
          defaultValue={stepsData.email.value}
          onBlur={(e) => handleValidation(e, { outOfFocus: true })}
          onChange={(e) => handleValidation(e)}
          error={stepsData.email.error !== false}
          helperText={
            stepsData.email.error ? stepsData.email.error : 'Please enter your email'
          }
          inputRef={emailRef}
          className={classes.inputFields}
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="outlined"
          color="gradient"
          defaultValue={stepsData.phoneNumber.value}
          onChange={(e) => handleValidation(e)}
          onBlur={(e) => handleValidation(e)}
          error={stepsData.phoneNumber.error !== false}
          helperText={
            stepsData.phoneNumber.error
              ? stepsData.phoneNumber.error
              : 'Please enter your phone number'
          }
          inputRef={phoneNumberRef}
          className={classes.inputFields}
        />
      </Grid>
    </>
  );
};

export default ContactInfoForm;

//
// const validate = (direction = 'forward') => {
// let emailInvalid = false;
// let phoneNumberInvalid = false;
// let newStepsData = {};
// const { value: emailValue } = emailRef.current;
// const { value: phoneNumberValue } = phoneNumberRef.current;
// if (!emailValue) {
//   emailInvalid = 'Please enter your email';
// }
// if (!phoneNumberValue) {
//   phoneNumberInvalid = 'Please enter your phone number';
// }
// newStepsData = {
//   ...stepsData,
//   email: {
//     ...stepsData.email,
//     value: emailValue,
//     error: emailInvalid,
//   },
//   phoneNumber: {
//     ...stepsData.phoneNumber,
//     value: phoneNumberValue,
//     error: phoneNumberInvalid,
//   },
// };
// handleGate(newStepsData, direction);
// setStepsData(newStepsData);
// };
