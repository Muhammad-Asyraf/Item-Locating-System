import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppBar as MUIAppBar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';

import { makeStyles } from '@mui/styles';

import {
  logout,
  clearActiveUser,
  verifying,
  verified,
  selectUser,
} from '../../../redux/features/authSlice';
import { selectStore } from '../../../redux/features/storeSlice';
import { auth } from '../../../services/firebase';

const drawerWidth = 240;
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
  const navigate = useNavigate();
  const { handleDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const storeUrl = localStorage.getItem('storeUrl');

  const currentUser = useSelector(selectUser);
  const currentStore = useSelector(selectStore);

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
    localStorage.removeItem('storeName');
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
    <div>
      <MUIAppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <svg width={0} height={0}>
            <linearGradient id="linearColors" x1={0} y1={0} x2={1.5} y2={1}>
              <stop offset="0%" stopColor="#473B7B" />
              <stop offset="51%" stopColor="#003366" />
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
            style={{ color: '#003366' }}
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
          <div style={{ color: 'black', paddingRight: 5 }}>Hi, {currentUser.displayName}</div>
          {/* <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon
                // sx={{ fill: 'url(#linearColors)' }}
                style={{ color: '#003366' }}
                color="primary"
                fontSize="large"
              />
            </Badge>
          </IconButton> */}
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
              style={{ color: '#003366' }}
              color="primary"
              fontSize="large"
            />
          </IconButton>
        </Toolbar>
      </MUIAppBar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          sx: {
            p: 0,
          },
        }}
        sx={{ pt: '0px !important', pb: '0px !important' }}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 3,
            overflow: 'visible',
            mt: 0.1,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 18,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <Box
          sx={{
            marginTop: '12px',
            marginBottom: '12px',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          <Typography
            variant="subtitle2"
            gutterBottom
            component="div"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: 600,
              marginBottom: 0,
            }}
          >
            {currentStore.store_name}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            component="div"
            sx={{
              color: 'rgb(99, 115, 129)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: 400,
            }}
          >
            {currentUser.email}
          </Typography>
        </Box>
        <Divider />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '8px',
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(`/${storeUrl}/profile`);
            }}
            sx={{
              '&:hover': {
                borderRadius: '8px !important',
              },
            }}
          >
            <ListItemIcon>
              <AccountBoxRoundedIcon sx={{ mr: 1.5, mt: 0.2 }} fontSize="small" /> Profile
            </ListItemIcon>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(`/${storeUrl}/store`);
            }}
            sx={{
              '&:hover': {
                borderRadius: '8px !important',
              },
            }}
          >
            <ListItemIcon>
              <StoreRoundedIcon sx={{ mr: 1.5, mt: 0.2 }} fontSize="small" /> Store
            </ListItemIcon>
          </MenuItem>
        </div>
        <Divider />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '8px',
          }}
        >
          <MenuItem
            onClick={handleSignOut}
            sx={{
              '&:hover': {
                borderRadius: '8px !important',
              },
            }}
          >
            <ListItemIcon>
              <LockIcon sx={{ mr: 1.5, mt: 0.2 }} fontSize="small" /> Logout
            </ListItemIcon>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
};

export default AppBar;
// export default withRouter(AppBar);
