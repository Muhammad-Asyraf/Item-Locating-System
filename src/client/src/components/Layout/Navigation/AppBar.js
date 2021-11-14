import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppBar as MUIAppBar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LockIcon from '@mui/icons-material/Lock';
import { makeStyles } from '@mui/styles';

import { clearActiveUser, verifying, verified } from '../../../redux/features/authSlice';
import { auth } from '../../../services/firebase';

const drawerWidth = 228;
const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    boxShadow:
      'rgb(159 162 191 / 18%) 0px 2px 3px, rgb(159 162 191 / 32%) 0px 1px 1px !important',
    backgroundColor: 'white !important',
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
    flexGrow: 2,
  },
  paper: {
    backgroundColor: 'red !important',
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
    localStorage.removeItem('storeUUID');
    localStorage.removeItem('storeUrl');
    history.push('/auth/login');
  };

  return (
    <div>
      <MUIAppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <svg width={0} height={0}>
            <linearGradient id="linearColors" x1={0} y1={0} x2={1.5} y2={1}>
              <stop offset="0%" stopColor="#473B7B" />
              <stop offset="51%" stopColor="#3584A7" />
              <stop offset="100%" stopColor="#30D2BE" />
            </linearGradient>
          </svg>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
            // sx={{ fill: 'url(#linearColors)' }}
            style={{ color: '#3584A7' }}
          >
            <MenuOpenRoundedIcon color="primary" fontSize="large" />
          </IconButton>

          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge color="primary">
              <SearchRoundedIcon
                sx={{ fill: 'url(#linearColors)' }}
                color="primary"
                fontSize="large"
              />
            </Badge>
          </IconButton>
          <div className={classes.search} />

          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon
                // sx={{ fill: 'url(#linearColors)' }}
                style={{ color: '#3584A7' }}
                color="primary"
                fontSize="large"
              />
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
            <AccountCircle
              // sx={{ fill: 'url(#linearColors)' }}
              style={{ color: '#3584A7' }}
              color="primary"
              fontSize="large"
            />
          </IconButton>
        </Toolbar>
      </MUIAppBar>

      <Menu
        anchorEl={anchorEl}
        id="merchant-account"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: 'visible',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 99,
              height: 32,
              ml: -2,
              mr: 9,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 31,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon sx={{ mr: 2 }}>
            <LockIcon sx={{ ml: 1.5, mr: 1.5, mt: 0.2 }} fontSize="small" /> Logout
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(AppBar);
