import { React, useState, useRef } from 'react';

import { makeStyles, withStyles } from '@mui/styles';
import { Stepper as MuiStepper } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

import axios from 'axios';

import ColorlibStepIcon from './ColorlibStepIcon';
import PersonalInfoForm from './PersonalInfoForm';
import ContactInfoForm from './ContactInfoForm';
import BusinessInfoForm from './BusinessInfoForm';
import AccountForm from './AccountForm';

import useAsyncState from '../../hooks/useAsyncState';
import { auth } from '../../services/firebase';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundColor: '#003366',
      // backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#003366',
      // backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
  root: {
    top: '22px !important',
  },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  titleContainer: {
    textAlign: 'center',
    marginBottom: '30px !important',
    marginTop: 5,
  },
  title: {
    fontWeight: '600',
    fontSize: '1.8rem',
  },
  button: {
    textTransform: 'none !important',
    height: '45px',
    color: 'white',
    width: '140px !important',
    // backgroundColor: '#58c1b7 !important',
    // color: 'black !important',
    backgroundColor: '#003366 ',
    // backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
    marginTop: '20px !important',
    borderRadius: '8px !important',
    boxShadow: 'rgb(30 136 229 / 24%) 0px 8px 16px 0px !important',
    '&:disabled': {
      backgroundImage: 'none',
    },
  },
  backButton: {
    textTransform: 'none !important',
    height: '45px',
    color: 'grey !important',
    marginTop: '20px !important',
    paddingRight: '20px !important',
    borderRadius: '10px',
    backgroundColor: 'transparent !important',
    '&:hover': {
      backgroundColor: '#F5F5F5 !important',
    },
  },
  disabledButton: {
    backgroundColor: 'red',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper: {
    margin: '0px 20px 50px 20px',
  },
  circle: {
    color: '#003366 !important',
  },
  circleContainer: {
    padding: 10,
  },
}));

function getDefaultValues() {
  return {
    value: '',
    error: false,
  };
}

function getSteps() {
  return ['Personal Info', 'Contact Information', 'Business Information', 'Account Setup'];
}

function getStepsTitle() {
  return [
    'Hi, nice to meet you',
    'How should we contact you?',
    'Tell us about your business',
    'Almost there!',
  ];
}

const Stepper = (props) => {
  const classes = useStyles();
  const steps = getSteps();
  const defaultVal = getDefaultValues();
  const titles = getStepsTitle();
  const { onSignup, authLoading } = props;
  const [activeStep, setActiveStep] = useAsyncState(0);
  const [error, setError] = useState(false);
  const [stepsData, setStepsData] = useState({
    firstName: defaultVal,
    lastName: defaultVal,
    email: { ...defaultVal, blurOnce: false },
    phoneNumber: defaultVal,
    storeName: defaultVal,
    storeAddress: defaultVal,
    storeUrl: defaultVal,
    password: { ...defaultVal, showPassword: false },
    viewport: {
      longitude: 101.697065,
      latitude: 3.171667,
      zoom: 15,
    },
    storeCoordinate: {
      longitude: 101.697065,
      latitude: 3.171667,
    },
  });

  const personalInfoFormRef = useRef();
  const contactInfoFormRef = useRef();
  const businessInfoFormRef = useRef();
  const accountFormRef = useRef();

  let registerButton;

  const prepThePayload = (newStepsData) => {
    const { viewport, ...payload } = newStepsData;
    const keys = Object.keys(payload);

    keys.forEach((key) => {
      if (key !== 'storeCoordinate') {
        payload[key] = payload[key].value;
      }
    });

    const userPayload = {
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      password: payload.password,
      phone_number: payload.phoneNumber,
    };

    const storePayload = {
      store_name: payload.storeName,
      store_address: payload.storeAddress,
      store_url: payload.storeUrl,
      store_coordinate: payload.storeCoordinate,
    };

    const data = {
      firebase: auth,
      userPayload,
      storePayload,
    };
    return data;
  };

  const handleNext = (newStepsData) => {
    if (activeStep === steps.length - 1) {
      const payload = prepThePayload(newStepsData);
      onSignup(payload);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const validate = (e, step = activeStep, direction = 'forward') => {
    const flags = {
      direction,
      sequentialValidation: true,
      currentData: stepsData,
    };

    switch (step) {
      case 0:
        personalInfoFormRef.current(null, flags);
        break;
      case 1:
        contactInfoFormRef.current(null, flags);
        break;
      case 2:
        businessInfoFormRef.current(null, flags);
        break;
      default:
        accountFormRef.current(null, flags);
    }
  };

  const handleBack = async () => {
    const updatedStep = activeStep - 1;
    setActiveStep(updatedStep);
    setTimeout(() => {
      validate(null, updatedStep, 'back');
    }, 200);
  };

  const checkEmailExist = async (email) => {
    const storeEndpointURL = `/api/backoffice/user-service/user/email/${email}`;
    let res;

    try {
      const { data } = await axios.get(storeEndpointURL);
      return data[0];
    } catch (err) {
      console.log('error', err);
    }

    return res;
  };

  const checkStoreUrlExist = async (storeUrl) => {
    const storeEndpointURL = `/api/backoffice/store-service/store/url/${storeUrl}`;
    let res;

    try {
      const { data } = await axios.get(storeEndpointURL);
      return data[0];
    } catch (err) {
      console.log('error', err);
    }

    return res;
  };

  const getStepContent = (step) => {
    const localProps = {
      handleNext,
      stepsData,
      setStepsData,
      setError,
    };

    switch (step) {
      case 0:
        return <PersonalInfoForm {...localProps} formRef={personalInfoFormRef} />;
      case 1:
        return (
          <ContactInfoForm
            {...localProps}
            formRef={contactInfoFormRef}
            checkEmailExist={checkEmailExist}
          />
        );
      case 2:
        return <BusinessInfoForm {...localProps} formRef={businessInfoFormRef} />;
      case 3:
        return (
          <AccountForm
            {...localProps}
            formRef={accountFormRef}
            checkStoreUrlExist={checkStoreUrlExist}
          />
        );
      default:
        return null;
    }
  };

  if (authLoading) {
    registerButton = (
      <div className={classes.circleContainer}>
        <CircularProgress size={20} className={classes.circle} />
      </div>
    );
  } else {
    registerButton = (
      <>
        Start Trial <ExitToAppRoundedIcon style={{ marginLeft: 10 }} />
      </>
    );
  }

  return (
    <div className={classes.root}>
      <Grid item xs={12} className={classes.titleContainer}>
        <div className={classes.title}>{titles[activeStep]}</div>
      </Grid>
      <MuiStepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        className={classes.stepper}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
      <form onSubmit={onSignup} autoComplete="on" style={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {getStepContent(activeStep)}
          {activeStep === 0 ? (
            <Grid
              item
              sm={12}
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item sm={12}>
                <Button
                  variant="contained"
                  onClick={validate}
                  className={classes.button}
                  disabled={error}
                >
                  Continue <ChevronRightRoundedIcon />
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item sm={12} container spacing={-1}>
              <Grid item sm={5}>
                <Button onClick={handleBack} className={classes.backButton}>
                  <KeyboardArrowLeftRoundedIcon /> Back
                </Button>
              </Grid>

              <Grid item sm={7}>
                <Button
                  variant="contained"
                  onClick={validate}
                  className={classes.button}
                  disabled={error}
                >
                  {activeStep === steps.length - 1 ? (
                    registerButton
                  ) : (
                    <>
                      Continue <ChevronRightRoundedIcon />
                    </>
                  )}
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </form>
    </div>
  );
};

export default Stepper;
