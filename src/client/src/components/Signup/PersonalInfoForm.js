import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles(() => ({
  inputFields: {
    width: '100%',
  },
}));

const PersonalInfoForm = (props) => {
  const classes = useStyles();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const { handleNext, stepsData, setStepsData, setError, formRef } = props;

  const handleGate = ({ firstName, lastName }, direction) => {
    const { error: firstNameError } = firstName;
    const { error: lastNameError } = lastName;

    if (firstNameError || lastNameError) {
      setError(true);
    } else {
      setError(false);
      if (direction === 'forward') {
        handleNext();
      }
    }
  };

  const validate = (target, ref, currentStepsData) => {
    const { value } = ref.current;
    let newStepsData;

    if (!value) {
      newStepsData = {
        ...currentStepsData,
        [target]: {
          value: ref.current.value,
          error: true,
        },
      };
    } else {
      newStepsData = {
        ...currentStepsData,
        [target]: {
          value: ref.current.value,
          error: false,
        },
      };
    }

    return newStepsData;
  };

  const handleValidation = (e, { ref, sequentialValidation, direction } = {}) => {
    let newStepsData = {};

    if (sequentialValidation) {
      newStepsData = validate('firstName', firstNameRef, stepsData);
      newStepsData = validate('lastName', lastNameRef, newStepsData);
    } else {
      const { id: target } = e.target;
      if (target === 'firstName') {
        newStepsData = validate(target, ref, stepsData);
      } else if (target === 'lastName') {
        newStepsData = validate(target, ref, stepsData);
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
          id="firstName"
          label="First Name"
          variant="outlined"
          color="gradient"
          defaultValue={stepsData.firstName.value}
          onChange={(e) => handleValidation(e, { ref: firstNameRef })}
          onBlur={(e) => handleValidation(e, { ref: firstNameRef })}
          error={stepsData.firstName.error !== false}
          helperText="Please enter your first name"
          inputRef={firstNameRef}
          className={classes.inputFields}
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          color="gradient"
          defaultValue={stepsData.lastName.value}
          onChange={(e) => handleValidation(e, { ref: lastNameRef })}
          onBlur={(e) => handleValidation(e, { ref: lastNameRef })}
          error={stepsData.lastName.error !== false}
          helperText="Please enter your last name"
          inputRef={lastNameRef}
          className={classes.inputFields}
        />
      </Grid>
    </>
  );
};

export default PersonalInfoForm;

// const validate = (e, { direction }) => {
//   let firstNameInvalid = false;
//   let lastNameInvalid = false;
//   let newStepsData = {};

//   const { value: firstNameValue } = firstNameRef.current;
//   const { value: lastNameValue } = lastNameRef.current;

//   if (!firstNameValue) {
//     firstNameInvalid = true;
//   }

//   if (!lastNameValue) {
//     lastNameInvalid = true;
//   }

//   newStepsData = {
//     ...stepsData,
//     firstName: {
//       value: firstNameValue,
//       error: lastNameInvalid,
//     },
//     lastName: {
//       value: lastNameValue,
//       error: firstNameInvalid,
//     },
//   };

//   finalCheck(newStepsData, direction);
//   setStepsData(newStepsData);
// };

// useEffect(() => {
//   formRef.current = validate;
// }, []);
