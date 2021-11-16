import React, { useState } from 'react';
import clsx from 'clsx';

import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';

import { makeStyles } from '@mui/styles';

import CategoryFilterDialog from '../Category/CategoryFilterDialog';

/* eslint-disable indent */
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '16px 16px 0px 0px',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  selected: {
    color: 'white !important',
    fontWeight: '600 !important',
    fontSize: '20px !important',
  },
  input: {
    borderRadius: '12px !important',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    handleMultipleDelete,
    handleSearch,
    setSelectedCategory,
    defaultValue,
    categoriesOption,
    filteredQuantity,
  } = props;

  const [openFilter, setOpenFilter] = useState(false);

  const handleClickOpen = () => setOpenFilter(true);

  const handleClose = () => setOpenFilter(false);

  console.log(filteredQuantity);
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <CategoryFilterDialog
        open={openFilter}
        handleClose={handleClose}
        categoryOptions={categoriesOption}
        setSelectedCategory={setSelectedCategory}
        defaultValue={defaultValue}
        filteredQuantity={filteredQuantity}
      />
      {numSelected > 0 ? (
        <Grid container sx={{ marginBottom: 3.5, marginTop: 3.5 }}>
          <Grid item xs={6} container justifyContent="flex-start" alignItems="center">
            <Typography
              className={classes.selected}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" alignItems="center">
            <Tooltip title="Delete">
              <IconButton
                className={classes.selected}
                aria-label="delete"
                onClick={handleMultipleDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ) : (
        <Grid container sx={{ marginBottom: 2.5, marginTop: 2.5 }}>
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              placeholder="Search for items ..."
              // label="Search for Items"
              autoComplete="off"
              variant="outlined"
              style={{ width: '50%' }}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                className: classes.input,
              }}
            />
          </Grid>
          <Grid
            item
            sm={2}
            container
            justifyContent="flex-end"
            alignItems="center"
            sx={{ fontSize: '0.875rem' }}
          >
            {defaultValue.length > 0 ? (
              <>
                <b>{filteredQuantity}</b> &nbsp;&nbsp; <span>Items found</span>
                &nbsp;&nbsp;
              </>
            ) : null}
          </Grid>
          <Grid item xs={1} container justifyContent="flex-end" alignItems="center">
            {filteredQuantity > 0 ? (
              <IconButton
                onClick={handleClickOpen}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'black',
                  borderRadius: 11,
                  backgroundColor:
                    defaultValue.length > 0 ? 'rgba(0, 0, 0, 0.04)' : 'white',
                }}
              >
                &nbsp;Filters&nbsp;&nbsp;
                <FilterListIcon fontSize="small" />
              </IconButton>
            ) : null}
          </Grid>
        </Grid>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
