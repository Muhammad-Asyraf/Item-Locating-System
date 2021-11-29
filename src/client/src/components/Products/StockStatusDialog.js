import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const commonStyle = {
  fontWeight: 'bold',
  fontSize: ' 0.98rem',
  paddingRight: 45,
  paddingLeft: 45,
  padding: '4px 45px 4px 45px',
  color: 'white',
  borderRadius: 15,
};

const inStockLabel = (
  <Typography
    style={{
      ...commonStyle,
      backgroundColor: '#39A388',
    }}
  >
    In Stock
  </Typography>
);

const lowInStock = (
  <Typography
    style={{
      ...commonStyle,
      backgroundColor: '#F0A500',
    }}
  >
    Low in Stock
  </Typography>
);
const outOfStock = (
  <Typography
    style={{
      ...commonStyle,
      backgroundColor: '#FF5151',
    }}
  >
    Out of Stock
  </Typography>
);

const StockStatusDialog = (props) => {
  const { open, handleClose, onUpdate, productLoading } = props;
  const [status, setStatus] = useState('In Stock');

  const updateStatus = (e) => {
    setStatus(e.target.value);
  };

  const reset = () => {
    setStatus('In Stock');
    handleClose();
  };

  const update = () => {
    setStatus('In Stock');
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
          width: '35vw !important',
          padding: '20px 40px 65px 40px',
          borderRadius: '10px !important',
        },
      }}
    >
      <h2 style={{ marginBottom: 10 }}>
        <b>Product Stock Status</b>
      </h2>

      <div>Please select the new stock status for the selected products.</div>
      <Grid container justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
        <Grid
          item
          xs={8}
          style={{
            // borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
            // borderTop: '1px solid rgba(0, 0, 0, 0.15)',
            // borderLeft: '1px solid rgba(0, 0, 0, 0.15)',
            // borderRight: '1px solid rgba(0, 0, 0, 0.15)',
            padding: '10px 14px 10px 25px',
            // borderRadius: 10,
            marginBottom: 25,
          }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <RadioGroup row defaultValue="In Stock" onChange={updateStatus}>
            <FormControlLabel value="In Stock" control={<Radio />} label={inStockLabel} />
            <FormControlLabel value="Low Stock" control={<Radio />} label={lowInStock} />
            <FormControlLabel
              value="Out of Stock"
              control={<Radio />}
              label={outOfStock}
            />
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

export default StockStatusDialog;
