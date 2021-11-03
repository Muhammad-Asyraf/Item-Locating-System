import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';

import Drawer from './Navigation/Drawer';
import AppBar from './Navigation/AppBar';

const drawerWidth = 228;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
      scrollBehavior: 'smooth',
    },
  },
  toolbar: theme.mixins.toolbar,
  container: {
    // flexGrow: 1,
    // padding: theme.spacing(3),
    padding: '70px 30px 10px 30px',
    backgroundColor: 'rgb(248, 248, 248)',
  },
}));

/* eslint-disable react/prop-types */
const Layout = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const { children } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
      </Container>
    </div>
  );
};

export default withRouter(Layout);
