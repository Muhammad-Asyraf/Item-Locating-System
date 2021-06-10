import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { loadCSS } from 'fg-loadcss';

import { Drawer as MUIDrawer, useMediaQuery } from '@material-ui/core';
// import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListSubheader from '@material-ui/core/ListSubheader';
import SvgIcon from '@material-ui/core/SvgIcon';

import Icon from '@material-ui/core/Icon';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { ReactComponent as Megaphone } from '../../assets/megaphone.svg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    boxShadow: 'rgb(159 162 191 / 18%) 2px 0px 3px, rgb(159 162 191 / 32%) 1px 0px 1px',
  },
  drawerPaperCurve: {
    width: drawerWidth,
    boxShadow: 'rgb(159 162 191 / 18%) 2px 0px 3px, rgb(159 162 191 / 32%) 1px 0px 1px',
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

/* eslint-disable react/prop-types */
const Drawer = (props) => {
  const classes = useStyles();
  const { history, window, type, status, handleDrawerToggle, match, location } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const container = window !== undefined ? () => window().document.body : undefined;
  const [open, setOpen] = useState({
    items: false,
    users: false,
  });

  const handleClick = (path) => {
    history.push(path);
    if (type === 'Mobile') {
      handleDrawerToggle();
    }
  };

  const drawerList = [
    {
      header: 'GENERAL',
      items: [
        {
          text: 'Dashboard',
          path: `${match.path}`,
          icon: <DashboardRoundedIcon color="primary" fontSize="large" />,
          onClick: () => handleClick(`${match.path}`),
        },
        {
          text: 'Sales',
          path: `${match.path}/sales`,
          icon: (
            <Icon
              className="fas fa-cash-register"
              style={{ fontSize: 30, margin: 3, color: '#007AFF' }}
            />
          ),
          onClick: () => handleClick(`${match.path}/sales`),
        },
      ],
    },
    {
      header: 'INVENTORY',
      items: [
        {
          text: 'Items',
          path: `${match.path}/item`,
          icon: <LocalOfferRoundedIcon color="primary" fontSize="large" />,
          onClick: () => setOpen({ ...open, items: !open.items }),
          itemSubList: [
            {
              _text: 'List',
              _path: `${match.path}/item/List`,
              _onClick: () => handleClick(`${match.path}/item/list`),
            },
            {
              _text: 'Create',
              _path: `${match.path}/item/Create`,
              _onClick: () => handleClick(`${match.path}/item/create`),
            },
          ],
        },
        {
          text: 'Item Mapping',
          path: `${match.path}/item-mapping`,
          icon: (
            <Icon
              className="fas fa-map-pin"
              style={{ fontSize: 30, marginLeft: 8, color: '#007AFF' }}
            />
          ),
          onClick: () => handleClick(`${match.path}/item-mapping`),
        },
      ],
    },
    {
      header: 'CATALOG',
      items: [
        {
          text: 'Promotions',
          path: `${match.path}/promotions`,
          icon: (
            <SvgIcon style={{ fontSize: 33, marginLeft: 3, color: '#007AFF' }}>
              <Megaphone />
            </SvgIcon>
          ),
          onClick: () => handleClick(`${match.path}/promotions`),
        },
        {
          text: 'Advertisements',
          path: `${match.path}/advertisements`,
          icon: (
            <Icon
              className="fas fa-ad"
              style={{ fontSize: 33, marginLeft: 3, color: '#007AFF' }}
            />
          ),
          onClick: () => handleClick(`${match.path}/advertisements`),
        },
      ],
    },
    {
      header: 'CONFIG',
      items: [
        {
          text: 'Users',
          path: `${match.path}/users`,
          icon: <SupervisorAccountRoundedIcon color="primary" fontSize="large" />,
          onClick: () => setOpen({ ...open, users: !open.users }),
          itemSubList: [
            {
              _text: 'List',
              _path: `${match.path}/users/list`,
              _onClick: () => handleClick(`${match.path}/users/list`),
            },
            {
              _text: 'Roles',
              _path: `${match.path}/roles/list`,
              _onClick: () => handleClick(`${match.path}/roles/list`),
            },
          ],
        },
        {
          text: 'Office',
          path: `${match.path}/office`,
          icon: (
            <Icon
              className="fas fa-building"
              style={{ fontSize: 33, marginLeft: 3, color: '#007AFF' }}
            />
          ),
          onClick: () => handleClick(`${match.path}/office`),
        },
      ],
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

  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css')
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <Hidden
      mdDown={type === 'Desktop' && true}
      mdUp={type === 'Mobile' && true}
      implementation="css"
    >
      <MUIDrawer
        container={type === 'Mobile' ? container : null}
        classes={{
          paper: type === 'Mobile' ? classes.drawerPaper : classes.drawerPaperCurve,
        }}
        variant={type === 'Mobile' ? 'temporary' : 'permanent'}
        anchor="left"
        open={type === 'Mobile' && status}
        onClose={type === 'Mobile' ? handleDrawerToggle : null}
      >
        {/* <div style={{ height: '2000px', overflow: 'hidden' }}> */}
        <div>
          <PerfectScrollbar>
            {/* <Divider /> */}
            <List>
              {drawerList.map(({ header, items }) => (
                <div key={header}>
                  <ListSubheader
                    disableSticky
                    style={{
                      fontSize: 12,
                      color: 'black',
                      fontWeight: 'bold',
                      marginTop: 15,
                    }}
                  >
                    {header}
                  </ListSubheader>
                  {items.map(({ text, path, icon, onClick, itemSubList = [] }) => {
                    const isExpandable = itemSubList && itemSubList.length > 0;
                    return (
                      <div key={text}>
                        <ListItem
                          button
                          classes={{ selected: classes.selected }}
                          selected={location.pathname === path}
                          onClick={onClick}
                        >
                          <ListItemIcon className={classes.listItemIcons}>
                            {icon}
                          </ListItemIcon>
                          <ListItemText className={classes.listItemTexts}>
                            {text}
                          </ListItemText>
                          {/* {isExpandable && open ? <ExpandLess /> : <ExpandMore />} */}
                          {isExpandable && !open[text.toLowerCase()] && (
                            <ExpandMore style={{ transform: 'rotate(-90deg)' }} />
                          )}
                          {isExpandable && open[text.toLowerCase()] && (
                            <ExpandLess style={{ transform: 'rotate(180deg)' }} />
                          )}
                        </ListItem>
                        {isExpandable && (
                          <Collapse
                            in={open[text.toLowerCase()]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              {itemSubList.map(({ _text, _path, _onClick }) => (
                                <ListItem
                                  button
                                  key={_text}
                                  className={classes.nested}
                                  onClick={_onClick}
                                  selected={location.pathname === _path}
                                >
                                  <ListItemIcon>
                                    <Icon
                                      className="fas fa-circle"
                                      style={{ fontSize: 5, marginLeft: 30 }}
                                    />
                                  </ListItemIcon>
                                  <ListItemText>{_text}</ListItemText>
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </List>
          </PerfectScrollbar>
        </div>
      </MUIDrawer>
    </Hidden>
  );
};

export default withRouter(Drawer);
