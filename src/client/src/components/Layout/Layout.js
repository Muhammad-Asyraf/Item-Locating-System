import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Alert from '@mui/lab/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

import Drawer from './Navigation/Drawer';
import AppBar from './Navigation/AppBar';

import {
  selectNotification,
  clearNotification,
} from '../../redux/features/notificationSlice';

const drawerWidth = 228;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
      scrollBehavior: 'smooth',
    },
  },
  toolbar: theme.mixins.toolbar,
  container: {
    padding: '60px 45px 35px 45px !important',
    height: '100% !important',
    // backgroundColor: 'rgb(250, 250, 250)',
    // backgroundColor: 'rgb(248, 248, 248)',
    // backgroundColor: 'rgb(236, 245, 249)',
    // backgroundColor: 'rgb(240, 245, 247)',
  },
}));

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

/* eslint-disable react/prop-types */
const Layout = (props) => {
  const classes = useStyles();
  const { children } = props;
  const dispatch = useDispatch();
  const { message, backgroundColor } = useSelector(selectNotification);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState({
    open: false,
    transition: '',
  });

  useEffect(() => {
    if (message) {
      setOpenSnackBar({
        open: true,
        transition: SlideTransition,
      });
    }
  }, [message]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar({
      ...openSnackBar,
      open: false,
    });

    setTimeout(() => {
      dispatch(clearNotification());
    }, 1500);
  };

  return (
    <div className={classes.root}>
      <AppBar handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer}>
        <Drawer
          type="Mobile"
          status={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Drawer type="Desktop" />
      </nav>
      <Container maxWidth="xl" className={classes.container}>
        {children}
        <Snackbar
          open={openSnackBar.open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={handleCloseSnackBar}
          TransitionComponent={openSnackBar.transition}
          // TransitionComponent={(Dprops) => <Slide {...Dprops} direction="left" />}
          key={openSnackBar.transition.name}
        >
          <Alert
            variant="filled"
            elevation={6}
            onClose={handleCloseSnackBar}
            sx={{
              width: '100%',
              backgroundColor,
              // backgroundColor: '#202124',
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default withRouter(Layout);
