import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import InputAdornment from '@mui/material/InputAdornment';
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded';
import MyLocationRoundedIcon from '@mui/icons-material/MyLocationRounded';

import StoreLocator from './StoreLocator';

const useStyles = makeStyles(() => ({
  map: {
    width: '100vw',
  },
  inputFields: {
    width: '100%',
    marginBottom: '30px !important',
  },
}));

const BusinessInfoForm = (props) => {
  const classes = useStyles();
  const storeNameRef = useRef();
  const storeAddressRef = useRef();
  const { handleNext, stepsData, setStepsData, setError, formRef } = props;

  const handleGate = ({ storeName, storeAddress }, direction) => {
    const { error: storeNameError } = storeName;
    const { error: storeAddressError } = storeAddress;

    if (storeNameError || storeAddressError) {
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

  const handleValidation = (
    target,
    { ref, currentData, sequentialValidation, direction } = {}
  ) => {
    let newStepsData = {};

    if (sequentialValidation && currentData) {
      newStepsData = validate('storeName', storeNameRef, currentData);
      newStepsData = validate('storeAddress', storeAddressRef, newStepsData);
    } else if (sequentialValidation) {
      newStepsData = validate('storeName', storeNameRef, stepsData);
      newStepsData = validate('storeAddress', storeAddressRef, newStepsData);
    } else if (target === 'storeName') {
      newStepsData = validate(target, ref, stepsData);
    } else if (target === 'storeAddress') {
      newStepsData = validate(target, ref, stepsData);
    }

    setStepsData(newStepsData);
    handleGate(newStepsData, direction);
  };

  const updateBusinessFormLocation = (locationData) => {
    if (typeof locationData.features !== 'undefined') {
      const name = locationData.features[0].text;
      const address = locationData.features[0].place_name;

      storeNameRef.current.value = name;
      storeAddressRef.current.value = address;

      handleValidation(null, { sequentialValidation: true });
    }
  };

  useEffect(() => {
    formRef.current = handleValidation;
  }, []);

  return (
    <>
      <Grid item sm={4} container>
        <Grid item sm={12}>
          <TextField
            id="storeName"
            label="Store Name"
            variant="outlined"
            color="gradient"
            defaultValue={stepsData.storeName.value}
            value={stepsData.storeName.value}
            onChange={(e) => handleValidation(e.target.id, { ref: storeNameRef })}
            onBlur={(e) => handleValidation(e.target.id, { ref: storeNameRef })}
            error={stepsData.storeName.error}
            inputRef={storeNameRef}
            className={classes.inputFields}
            margin="none"
            helperText="Please enter your store's name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StoreMallDirectoryRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="storeAddress"
            label="Business Address"
            variant="outlined"
            color="gradient"
            multiline
            maxRows={5}
            defaultValue={stepsData.storeAddress.value}
            value={stepsData.storeAddress.value}
            onChange={(e) => handleValidation(e.target.id, { ref: storeAddressRef })}
            onBlur={(e) => handleValidation(e.target.id, { ref: storeAddressRef })}
            error={stepsData.storeAddress.error}
            inputRef={storeAddressRef}
            className={classes.inputFields}
            helperText="Please enter your store's address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MyLocationRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid item sm={8} className={classes.map}>
        <StoreLocator
          stepsData={stepsData}
          setStepsData={setStepsData}
          updateBusinessFormLocation={updateBusinessFormLocation}
        />
      </Grid>
    </>
  );
};

export default BusinessInfoForm;
