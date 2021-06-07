import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Drawer from './Drawer';
import AppBars from './AppBars';

import Inventory from '../Inventory';
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path={`${match.path}`} exact component={Home} />
          <Route path={`${match.path}/inventory`} component={Inventory} />
          <Route path={`${match.path}/sales`} component={Sales} />
        </Switch>
      </main>
    </div>
  );
};

export default withRouter(Dashboard);
