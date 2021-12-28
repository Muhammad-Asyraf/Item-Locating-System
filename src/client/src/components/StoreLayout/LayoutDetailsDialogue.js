import React from 'react';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const LayoutDetailsDialogue = (props) => {
  const { open, handleClose, name, label, setName, setLabel } = props;

  const handleInputChange = ({ target }) => {
    const { id, value } = target;

    if (id === 'name') {
      setName(value);
    } else if (id === 'label') {
      setLabel(value);
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
        <b>Layout Details</b>
      </h2>

      <div>
        Please enter the layout&apos;s name and appropriate label for your customer reference.
      </div>
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
              id="name"
              label="Name"
              variant="standard"
              onChange={handleInputChange}
              style={{ width: '100%' }}
              value={name}
              // onBlur={handleInputChange}
              // error={productName.error !== false}
              // helperText={productName.error}
              // className={classes.inputFields}
              // inputRef={nameRef}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="label"
              label="Label"
              variant="standard"
              onChange={handleInputChange}
              style={{ width: '100%' }}
              value={label}
              // onBlur={handleInputChange}
              // error={productName.error !== false}
              // helperText={productName.error}
              // className={classes.inputFields}
              // inputRef={nameRef}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BookmarksRoundedIcon />
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
              onClick={handleClose}
              variant="contained"
              color="primary"
              type="button"
              sx={{
                textTransform: 'none',
                fontSize: '0.95rem',
                borderRadius: 3,
                height: 50,

                width: 170,
                boxShadow: 'rgba(53, 132, 167, 0.44) 0px 8px 16px 0px !important',
              }}
            >
              <SaveRoundedIcon style={{ marginRight: 10 }} fontSize="small" /> Update Details
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default LayoutDetailsDialogue;
