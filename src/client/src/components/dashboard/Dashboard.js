import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Drawer from './Drawer';
import AppBars from './AppBars';

import Item from '../Item';
import Sales from '../Sales';
import Home from '../Home';

import { clearState } from '../../redux/features/authSlice';

const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
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
const Dashboard = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { match } = props;

  useEffect(() => {
    dispatch(clearState());
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <AppBars handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer}>
        <Drawer
          type="Mobile"
          status={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Drawer type="Desktop" />
      </nav>
      <Container maxWidth="xl" className={classes.container}>
        <Switch>
          <Route path={`${match.path}`} exact component={Home} />
          <Route path={`${match.path}/item`} component={Item} />
          <Route path={`${match.path}/sales`} component={Sales} />
        </Switch>
      </Container>
    </div>
  );
};

export default withRouter(Dashboard);
