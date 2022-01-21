import React, { useState, useRef } from 'react';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import PasswordIcon from '@mui/icons-material/Password';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const PasswordRequestDialogue = (props) => {
  const { open, handleClose, setUserPassword, proceed } = props;

  const passwordRef = useRef();
  const [passwordError, setPasswordError] = useState(false);

  const handleInputChange = ({ target }) => {
    const { value } = target;

    setUserPassword(value);
  };

  const validatePassword = (value) => {
    let error;

    if (!value) {
      error = 'Please enter your password';
    } else {
      error = false;
    }

    return error;
  };

  const handleSubmit = () => {
    const updatedPasswordError = validatePassword(passwordRef.current.value);
    setPasswordError(updatedPasswordError);

    if (!passwordError) {
      handleClose();
      proceed();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        style: { paddingBottom: 40 },
        sx: {
          width: '35vw !important',
          padding: '20px 40px 65px 40px',
          borderRadius: '10px !important',
        },
      }}
    >
      <h2 style={{ marginBottom: 10 }}>
        <b>Confirm password to continue</b>
      </h2>

      <div>Please enter your password to proceed with these changes.</div>
      <Grid container justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
        <Grid
          item
          xs={12}
          style={{
            marginBottom: 40,
          }}
          container
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
              inputRef={passwordRef}
              onBlur={handleInputChange}
              onChange={handleInputChange}
              error={passwordError !== false}
              helperText={passwordError}
              style={{ width: '100%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="flex-end"
          alignItems="center"
          spacing={1.5}
        >
          <Grid item>
            <Button
              onClick={handleClose}
              sx={{
                textTransform: 'none',
                fontSize: '0.95rem',
                borderRadius: 3,
                height: 50,
                paddingLeft: 4,
                paddingRight: 4,
                backgroundColor: 'white',
                color: ' rgba(0, 0, 0, 0.9)',
                // border: '1px solid rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.07) !important',
                },
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              type="button"
              sx={{
                textTransform: 'none',
                fontSize: '0.95rem',
                borderRadius: 3,
                height: 50,

                width: 200,
                boxShadow: 'rgba(53, 132, 167, 0.44) 0px 8px 16px 0px !important',
              }}
            >
              Confirm Password
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default PasswordRequestDialogue;
