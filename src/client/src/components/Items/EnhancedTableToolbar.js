import React from 'react';
import clsx from 'clsx';

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

/* eslint-disable indent */
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: '16px 16px 0px 0px',

    marginBottom: 10,
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

  title: {
    flex: '1 1 100%',
  },
  selected: {
    flex: '1 1 100%',
    color: 'white !important',
    fontWeight: '600 !important',
    fontSize: '20px !important',
    marginBottom: '8px !important',
    paddingTop: '8px !important',
  },
  input: {
    borderRadius: '12px !important',
    // backgroundColor: 'rgb(244, 246, 248) !important',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, handleMultipleDelete, handleSearch } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.selected}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <div style={{ flex: '1 1 100%', marginTop: 5, marginBottom: -10 }}>
          <TextField
            id="outlined-basic"
            placeholder="Search for items ..."
            // label="Search for Items"
            variant="outlined"
            style={{ width: '40%' }}
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
        </div>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            className={classes.selected}
            aria-label="delete"
            onClick={handleMultipleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div style={{ paddingTop: 10 }}>
          <Tooltip title="Search Filter">
            <IconButton aria-label="filter list">
              Filter&nbsp;
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
