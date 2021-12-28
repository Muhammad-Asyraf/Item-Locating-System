import React from 'react';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  drawer: {
    width: 400,
    borderRadius: '20px 0px 0px 20px',
    height: '60% !important',
    top: '22% !important',
    // height: '95% !important',
    // top: '18px !important',
    boxShadow: 'rgba(99, 115, 129, 0.16) -24px 12px 32px -4px !important',
    backgroundColor: 'rgb(17, 25, 42) !important',
  },
  input: {
    borderRadius: '12px !important',
    color: 'white !important',
  },
  notchedOutline: {
    border: '1px solid white !important',
    borderRadius: '12px !important',
  },
  filterBtn: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08) !important',
    },
  },
}));

const ProductDrawer = (props) => {
  const classes = useStyles();

  const { open, toggleDrawer } = props;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      sx={{ zIndex: 3000 }}
      classes={{
        paper: classes.drawer,
      }}
      ModalProps={{ BackdropProps: { style: { backgroundColor: 'transparent' } } }}
    >
      <Grid container sx={{ color: 'white', padding: 2, pr: 1 }}>
        <Grid item xs={10.5}>
          <TextField
            id="outlined-basic"
            placeholder="Search for product..."
            autoComplete="off"
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            // onChange={handleSearch}
            // onInput={updateSearchInput}
            // defaultValue={searchValue}
            InputProps={{
              className: classes.input,
              classes: {
                notchedOutline: classes.notchedOutline,
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: 'white' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={1.5} container justifyContent="center" alignItems="center">
          <IconButton classes={{ root: classes.filterBtn }}>
            <FilterListIcon style={{ color: 'white' }} sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default ProductDrawer;
