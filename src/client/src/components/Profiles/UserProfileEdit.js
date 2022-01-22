import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import EnhancedEncryptionRoundedIcon from '@mui/icons-material/EnhancedEncryptionRounded';

import { makeStyles } from '@mui/styles';

import PasswordRequestDialogue from './PasswordRequestDialogue';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '90%',
    padding: 30,
    marginTop: 20,
    marginBottom: theme.spacing(2),
    boxShadow:
      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px !important',
    borderRadius: '16px !important',
  },
  inputFields: {
    width: '80%',
  },
}));

const UserProfileEdit = (props) => {
  const classes = useStyles();

  const { user, onSubmit, checkEmailExist } = props;

  const [userPassword, setUserPassword] = useState('');
  const [validationComplete, setValidationComplete] = useState(false);
  const [openCampaignDialog, setOpenCampaignDialog] = useState(false);
  const [changePasswordChecked, setChangePasswordChecked] = useState(false);
  const [firstName, setFirstName] = useState({
    value: user.first_name,
    error: false,
  });
  const [lastName, setLastName] = useState({
    value: user.last_name,
    error: false,
  });
  const [email, setEmail] = useState({
    blurOnce: false,
    value: user.email,
    error: false,
  });
  const [phoneNumber, setPhoneNumber] = useState({
    value: user.phone_number,
    error: false,
  });
  const [currentPassword, setCurrentPassword] = useState({
    value: '',
    error: false,
  });
  const [newPassword, setNewPassword] = useState({
    value: '',
    error: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: false,
  });

  const handleClickOpenDialog = () => setOpenCampaignDialog(true);
  const handleCloseDialog = () => setOpenCampaignDialog(false);
  const handleChangePassword = () => {
    setChangePasswordChecked(!changePasswordChecked);
  };

  const validatePhoneNumber = (phoneValue) => {
    const reg = /^(01)[0-46-9]*[0-9]{7,8}$/;
    const isValidPhoneNumber = reg.test(phoneValue);
    let updatedPhoneNumber = {};

    if (!phoneValue) {
      updatedPhoneNumber = {
        value: phoneValue,
        error: 'Please enter your phone number',
      };
    } else if (!isValidPhoneNumber) {
      updatedPhoneNumber = {
        value: phoneValue,
        error: "Invalid Malaysia's phone number",
      };
    } else {
      updatedPhoneNumber = {
        value: phoneValue,
        error: false,
      };
    }

    setPhoneNumber(updatedPhoneNumber);
  };

  const validateFirstName = (value) => {
    let updateFirstName = {};

    if (!value) {
      updateFirstName = {
        value,
        error: 'Please enter your first name',
      };
    } else {
      updateFirstName = {
        value,
        error: false,
      };
    }

    setFirstName(updateFirstName);
  };

  const validateLastName = (value) => {
    let updatedLastName = {};

    if (!value) {
      updatedLastName = {
        value,
        error: 'Please enter your last name',
      };
    } else {
      updatedLastName = {
        value,
        error: false,
      };
    }

    setLastName(updatedLastName);
  };

  /* eslint-disable no-useless-escape */
  const validateEmail = async (emailValue, outOfFocus, finalValidation = false) => {
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))*$/;

    const value = emailValue.trim().toLowerCase();
    const isValidEmail = reg.test(value);
    let emailExist = false;
    let updatedEmail;

    if (finalValidation && isValidEmail) {
      emailExist = await checkEmailExist(emailValue);
    }

    if (emailValue && outOfFocus === true && email.blurOnce === false) {
      updatedEmail = {
        ...email,
        blurOnce: true,
        error: !isValidEmail ? 'Email must be a valid email address GG' : false,
      };
    } else if (!emailValue) {
      updatedEmail = {
        ...email,
        value: emailValue,
        error: 'Email is required',
      };
    } else if (!isValidEmail && email.blurOnce === true) {
      updatedEmail = {
        ...email,
        value: emailValue,
        error: 'Email must be a valid email address',
      };
    } else if (emailExist && isValidEmail) {
      updatedEmail = {
        ...email,
        value: emailValue,
        error: 'Email address already has been used by other account',
      };
    } else {
      updatedEmail = {
        ...email,
        error: false,
        value: emailValue,
      };
    }

    setEmail(updatedEmail);
  };

  const validateCurrentPassword = (value) => {
    let updatedCurrentPassword = {};

    if (!value) {
      updatedCurrentPassword = {
        value,
        error: 'Please enter your current password',
      };
    } else {
      updatedCurrentPassword = {
        value,
        error: false,
      };
    }

    setCurrentPassword(updatedCurrentPassword);
  };

  const validateNewPassword = (value) => {
    let updatedNewPassword = {};

    if (!value) {
      updatedNewPassword = {
        value,
        error: 'Please enter your new password',
      };
    } else {
      updatedNewPassword = {
        value,
        error: false,
      };
    }

    setNewPassword(updatedNewPassword);
  };

  const validateConfirmPassword = (value, newPasswordValue) => {
    const isValidConfirmPassword = value === newPasswordValue;
    let updatedConfirmPassword = {};

    if (!value) {
      updatedConfirmPassword = {
        value,
        error: 'Please confirm your new password',
      };
    } else if (!isValidConfirmPassword) {
      updatedConfirmPassword = {
        value,
        error: "Password doesn't match!",
      };
    } else {
      updatedConfirmPassword = {
        value,
        error: false,
      };
    }

    setConfirmPassword(updatedConfirmPassword);
  };

  const handleInputChange = ({ target }, outOfFocus = false) => {
    const { id, value } = target;

    if (id === 'first-name') {
      validateFirstName(value);
    } else if (id === 'last-name') {
      validateLastName(value);
    } else if (id === 'email') {
      validateEmail(value, outOfFocus);
    } else if (id === 'phone-number') {
      validatePhoneNumber(value);
    } else if (id === 'current-password') {
      validateCurrentPassword(value);
    } else if (id === 'new-password') {
      validateNewPassword(value);

      if (confirmPassword.value) {
        validateConfirmPassword(confirmPassword.value, value);
      }
    } else if (id === 'confirm-password') {
      validateConfirmPassword(value, newPassword.value);
    }
  };

  const validateForm = async (e) => {
    e.preventDefault();

    validateFirstName(firstName.value);
    validateLastName(lastName.value);
    await validateEmail(email.value, false, true);
    validatePhoneNumber(phoneNumber.value);

    if (changePasswordChecked) {
      validateCurrentPassword(currentPassword.value);
      validateNewPassword(newPassword.value);
      validateConfirmPassword(confirmPassword.value, newPassword.value);
    }
    setValidationComplete(true);
  };

  const preparedPayload = () => {
    const payload = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      phone_number: phoneNumber.value,
      changePasswordRequest: changePasswordChecked,
      currentPassword: changePasswordChecked ? currentPassword.value : userPassword,
      newPassword: newPassword.value,
    };

    return payload;
  };

  const handleSubmit = () => {
    const payload = preparedPayload();
    // console.log(payload);
    // console.log(onSubmit);
    onSubmit(payload);
  };

  useEffect(() => {
    const reset = false;

    if (validationComplete) {
      const noCurrentPasswordError = changePasswordChecked ? !currentPassword.error : true;
      const noNewPasswordError = changePasswordChecked ? !newPassword.error : true;
      const noConfirmPasswordError = changePasswordChecked ? !confirmPassword.error : true;

      const passedValidationChecked =
        !firstName.error &&
        !lastName.error &&
        !email.error &&
        !phoneNumber.error &&
        noCurrentPasswordError &&
        noNewPasswordError &&
        noConfirmPasswordError;

      if (passedValidationChecked && !changePasswordChecked) {
        handleClickOpenDialog();
      } else if (passedValidationChecked && changePasswordChecked) {
        handleSubmit();
      }
    }

    setValidationComplete(reset);
  }, [validationComplete]);

  return (
    <form id="profile-form" onSubmit={validateForm}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          md={12}
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
                  <BadgeRoundedIcon
                    sx={{ position: 'relative', top: 5, mr: 1.5 }}
                    color="primary"
                  />
                  First Name
                </h4>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="first-name"
                  className={classes.inputFields}
                  variant="outlined"
                  onBlur={handleInputChange}
                  onChange={handleInputChange}
                  value={firstName.value}
                  error={firstName.error !== false}
                  helperText={firstName.error}
                  InputProps={{
                    style: {
                      borderRadius: 8,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
                  <BadgeTwoToneIcon
                    sx={{ position: 'relative', top: 5, mr: 1.5 }}
                    color="primary"
                  />
                  Last Name
                </h4>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="last-name"
                  className={classes.inputFields}
                  variant="outlined"
                  onBlur={handleInputChange}
                  onChange={handleInputChange}
                  value={lastName.value}
                  error={lastName.error !== false}
                  helperText={lastName.error}
                  InputProps={{
                    style: {
                      borderRadius: 8,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
                  <ContactMailRoundedIcon
                    sx={{ position: 'relative', top: 5, mr: 1.5 }}
                    color="primary"
                  />
                  Email
                </h4>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="email"
                  className={classes.inputFields}
                  variant="outlined"
                  onBlur={(e) => handleInputChange(e, true)}
                  onChange={handleInputChange}
                  value={email.value}
                  error={email.error !== false}
                  helperText={email.error}
                  InputProps={{
                    style: {
                      borderRadius: 8,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
                  <ContactPhoneRoundedIcon
                    sx={{ position: 'relative', top: 5, mr: 1.5 }}
                    color="primary"
                  />
                  Phone Number
                </h4>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="phone-number"
                  className={classes.inputFields}
                  variant="outlined"
                  onBlur={handleInputChange}
                  onChange={handleInputChange}
                  value={phoneNumber.value}
                  error={phoneNumber.error !== false}
                  helperText={phoneNumber.error}
                  InputProps={{
                    style: {
                      borderRadius: 8,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} container sx={{ mt: changePasswordChecked ? 5 : 0 }}>
          <Grid item xs={0.65} />
          <Grid item xs={7}>
            {changePasswordChecked && (
              <h1 style={{ marginBottom: 0, marginTop: 0, fontSize: '2em' }}>
                Change Password
              </h1>
            )}
          </Grid>
          <Grid
            item
            xs={3.7}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <FormGroup onChange={handleChangePassword}>
              <FormControlLabel
                control={<Checkbox checked={changePasswordChecked} />}
                label="Change Password"
              />
            </FormGroup>
          </Grid>
        </Grid>
        {changePasswordChecked && (
          <Grid
            item
            xs={12}
            md={12}
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
          >
            <Paper className={classes.paper} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
                    <PasswordRoundedIcon
                      sx={{ position: 'relative', top: 5, mr: 1.5 }}
                      color="primary"
                    />
                    Current Password
                  </h4>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    id="current-password"
                    className={classes.inputFields}
                    variant="outlined"
                    type="password"
                    onBlur={handleInputChange}
                    onChange={handleInputChange}
                    value={currentPassword.value}
                    error={currentPassword.error !== false}
                    helperText={currentPassword.error}
                    InputProps={{
                      style: {
                        borderRadius: 8,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={3}>
                  <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
                    <EnhancedEncryptionRoundedIcon
                      sx={{ position: 'relative', top: 5, mr: 1.5 }}
                      color="primary"
                    />
                    New Password
                  </h4>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    id="new-password"
                    className={classes.inputFields}
                    variant="outlined"
                    type="password"
                    onBlur={handleInputChange}
                    onChange={handleInputChange}
                    value={newPassword.value}
                    error={newPassword.error !== false}
                    helperText={newPassword.error}
                    InputProps={{
                      style: {
                        borderRadius: 8,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={3}>
                  <h4 style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
                    <LockRoundedIcon
                      sx={{ position: 'relative', top: 5, mr: 1.5 }}
                      color="primary"
                    />
                    Confirm Password
                  </h4>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    id="confirm-password"
                    className={classes.inputFields}
                    variant="outlined"
                    type="password"
                    onBlur={handleInputChange}
                    onChange={handleInputChange}
                    value={confirmPassword.value}
                    error={confirmPassword.error !== false}
                    helperText={confirmPassword.error}
                    InputProps={{
                      style: {
                        borderRadius: 8,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
      <PasswordRequestDialogue
        open={openCampaignDialog}
        handleClose={handleCloseDialog}
        setUserPassword={setUserPassword}
        proceed={handleSubmit}
      />
    </form>
  );
};

export default UserProfileEdit;
