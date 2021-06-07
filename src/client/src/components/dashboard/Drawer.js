import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { Drawer as MUIDrawer, useMediaQuery } from '@material-ui/core';
// import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    boxShadow:
      'rgb(159 162 191 / 18%) 2px 0px 3px, rgb(159 162 191 / 32%) 1px 0px 1px',
  },
  drawerPaperCurve: {
    width: drawerWidth,
    boxShadow:
      'rgb(159 162 191 / 18%) 2px 0px 3px, rgb(159 162 191 / 32%) 1px 0px 1px',
    borderRadius: '0px 8px 8px 0px',
  },
  listItem: {
    padding: '8px 20px 8px 30px',
  },
  listItemIcons: {
    minWidth: '60px !important',
  },
  listItemTexts: {
    fontSize: '1.1rem !important',
    // fontWeight: 900,
  },
  selected: {
    backgroundColor: 'rgba(0, 122, 255, 0.08) !important',
    color: '#007AFF !important',
    fontWeight: 600,
  },
}));

/* eslint-disable react/prop-types */
const Drawer = (props) => {
  const classes = useStyles();
  const { history, window, type, status, handleDrawerToggle, match, location } =
    props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const container = window !== undefined ? () => window().document.body : undefined;
  const itemsList = [
    {
      text: 'Dashboard',
      path: `${match.path}`,
      icon: <DashboardRoundedIcon fontSize="large" />,
      onClick: () => history.push(`${match.path}`),
    },
    {
      text: 'Inventory',
      path: `${match.path}/inventory`,
      icon: <StoreRoundedIcon fontSize="large" />,
      onClick: () => history.push(`${match.path}/inventory`),
    },
    {
      text: 'Sales',
      path: `${match.path}/sales`,
      icon: <MonetizationOnIcon fontSize="large" />,
      onClick: () => history.push(`${match.path}/sales`),
    },
  ];

  useEffect(() => {
    const element = document.querySelector('.MuiDrawer-root.MuiDrawer-modal');
    if (isDesktop && element) {
      element.style.display = 'none';
    } else if (element) {
      element.style.display = 'block';
    }
  }, [isDesktop]);

  console.log(props);
  return (
    <Hidden
      mdDown={type === 'Desktop' && true}
      mdUp={type === 'Mobile' && true}
      implementation="css"
    >
      <div style={{ height: '500px', overflow: 'hidden' }}>
        <PerfectScrollbar>
          <MUIDrawer
            container={type === 'Mobile' ? container : null}
            classes={{
              paper:
                type === 'Mobile' ? classes.drawerPaper : classes.drawerPaperCurve,
            }}
            variant={type === 'Mobile' ? 'temporary' : 'permanent'}
            anchor="left"
            open={type === 'Mobile' && status}
            onClose={type === 'Mobile' ? handleDrawerToggle : null}
          >
            {/* <div className={classes.toolbar} /> */}
            {/* <Divider /> */}
            <List>
              {itemsList.map(({ text, path, icon, onClick }) => (
                <ListItem
                  button
                  key={text}
                  onClick={onClick}
                  classes={{ selected: classes.selected }}
                  selected={location.pathname === path}
                >
                  <ListItemIcon className={classes.listItemIcons}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText className={classes.listItemTexts}>
                    {text}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </MUIDrawer>
        </PerfectScrollbar>
      </div>
    </Hidden>
  );
};

export default withRouter(Drawer);
