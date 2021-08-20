import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppBar as MUIAppBar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';

import { clearActiveUser, verifying, verified } from '../../../redux/features/authSlice';
import { auth } from '../../../firebase';

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    boxShadow:
      'rgb(159 162 191 / 18%) 0px 2px 3px, rgb(159 162 191 / 32%) 0px 1px 1px !important',
    backgroundColor: 'white',
    padding: '5px 0px 0px 0px',
  },
  menuButton: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  search: {
    flexGrow: 1,
  },
}));

const AppBar = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const { handleDrawerToggle } = props;
  const { history, handleDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    setAnchorEl(null);
    dispatch(verifying());
    await auth.signOut();
    dispatch(clearActiveUser());
    dispatch(verified());
    history.push('/auth/login');
  };

  return (
    <div>
      <MUIAppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuOpenRoundedIcon color="primary" fontSize="large" />
          </IconButton>

          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge color="primary">
              <SearchRoundedIcon color="primary" fontSize="large" />
            </Badge>
          </IconButton>
          <div className={classes.search} />

          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon color="primary" fontSize="large" />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            aria-controls="merchant-account"
            color="primary"
            onClick={handleClick}
          >
            <AccountCircle color="primary" fontSize="large" />
          </IconButton>
        </Toolbar>
      </MUIAppBar>
      <Menu
        anchorEl={anchorEl}
        id="merchant-account"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSignOut}>
          <LockIcon style={{ padding: 5, fontSize: 30 }} /> Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(AppBar);
