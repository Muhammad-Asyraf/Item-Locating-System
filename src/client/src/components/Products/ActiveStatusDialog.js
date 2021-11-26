import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const commonStyle = {
  fontWeight: 'bold',
  fontSize: ' 0.98rem',
  // paddingRight: 25,
  // paddingLeft: 20,
  padding: '5px 25px 8px 25px',
  color: 'white',
  borderRadius: 8,
};

const activate = (
  <Typography
    style={{
      ...commonStyle,
      backgroundColor: '#39A388',
    }}
  >
    <CheckCircleIcon fontSize="small" style={{ position: 'relative', top: 4 }} /> &nbsp;
    Activate
  </Typography>
);

const deActivate = (
  <Typography
    style={{
      ...commonStyle,
      backgroundColor: '#FF5151',
    }}
  >
    <InfoRoundedIcon fontSize="small" style={{ position: 'relative', top: 4 }} /> &nbsp;
    Deactivate
  </Typography>
);

// const activate = (
//   <Typography>
//     <b>Activate</b>{' '}
//   </Typography>
// );

// const deActivate = (
//   <Typography>
//     <b>Deactivate</b>{' '}
//   </Typography>
// );

const ActiveStatusDialog = (props) => {
  const { open, handleClose, onUpdate, productLoading } = props;
  const [status, setStatus] = useState('activate');

  const updateStatus = (e) => {
    setStatus(e.target.value);
  };

  const reset = () => {
    setStatus('activate');
    handleClose();
  };

  const update = () => {
    setStatus('activate');
    onUpdate(status, handleClose);
  };

  return (
    <Dialog
      open={open}
      onClose={reset}
      TransitionComponent={Transition}
      PaperProps={{
        style: { paddingBottom: 40 },
        sx: {
          maxWidth: '40vw !important',
          padding: '20px 40px 65px 40px',
          borderRadius: '10px !important',
        },
      }}
    >
      <h2 style={{ marginBottom: 10 }}>
        <b>Product Activation Status</b>
      </h2>

      <div>
        Please select the new status for the selected products.&nbsp;
        <b>
          <u>Inactive product</u>
        </b>
        &nbsp;will be removed from your store catalogue at the LOKETLA mobile app.
      </div>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{ mt: 3 }}>
        <Grid
          item
          xs={7}
          style={{
            // borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
            // borderTop: '1px solid rgba(0, 0, 0, 0.15)',
            // borderLeft: '1px solid rgba(0, 0, 0, 0.15)',
            // borderRight: '1px solid rgba(0, 0, 0, 0.15)',
            // borderRadius: 10,
            padding: '10px 14px 10px 25px',
            marginBottom: 15,
          }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <RadioGroup row defaultValue="activate" onChange={updateStatus}>
            <FormControlLabel value="activate" control={<Radio />} label={activate} />
            <FormControlLabel value="deactivate" control={<Radio />} label={deActivate} />
          </RadioGroup>
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
              onClick={reset}
              sx={{
                textTransform: 'none',
                fontSize: '0.95rem',
                borderRadius: 3,
                height: 50,
                paddingLeft: 4,
                paddingRight: 4,
                backgroundColor: 'white',
                color: ' rgba(0, 0, 0, 0.9)',

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
              onClick={update}
              variant="contained"
              color="primary"
              type="button"
              sx={{
                textTransform: 'none',
                fontSize: '0.95rem',
                borderRadius: 3,
                height: 50,
                paddingRight: 3,
                paddingLeft: 3,
                width: 130,
                boxShadow: 'rgba(53, 132, 167, 0.44) 0px 8px 16px 0px !important',
              }}
            >
              {productLoading ? (
                <CircularProgress size={25} style={{ color: 'white' }} />
              ) : (
                <>
                  <SaveRoundedIcon style={{ marginRight: 10 }} fontSize="small" /> Update
                </>
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ActiveStatusDialog;
