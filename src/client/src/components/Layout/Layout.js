import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

import Drawer from './Navigation/Drawer';
import AppBar from './Navigation/AppBar';

import { selectNotification, clearNotification } from '../../redux/features/notificationSlice';

import '../../assets/css/overrideSnackbar.css';

const drawerWidth = 240;
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
const Layout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { message, backgroundColor, severity } = useSelector(selectNotification);

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
    }, 500);
  };

  return (
    <div className={classes.root}>
      <AppBar handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer}>
        <Drawer type="Mobile" status={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Drawer type="Desktop" />
      </nav>
      <Container maxWidth="xl" className={classes.container}>
        <Outlet />
        <Snackbar
          open={openSnackBar.open}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={handleCloseSnackBar}
          TransitionComponent={openSnackBar.transition}
          // TransitionComponent={(Dprops) => <Slide {...Dprops} direction="left" />}
          key={openSnackBar.transition.name}
        >
          <Alert
            severity={severity}
            variant="filled"
            elevation={6}
            onClose={handleCloseSnackBar}
            sx={{
              width: '100%',
              backgroundColor: '#202124',
              borderRadius: 1,
              '&:before': {
                top: '0px',
                left: '0px',
                width: '11px',
                bottom: '0px',
                content: '""',
                display: 'block',
                position: 'absolute',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px',
                backgroundColor,
              },
            }}
          >
            <span style={{ left: -2, position: 'relative' }}>{message}</span>
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Layout;
// export default withRouter(Layout);
