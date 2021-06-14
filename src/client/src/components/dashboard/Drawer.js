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
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccountTwoTone';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import SupervisedUserCircleTwoToneIcon from '@material-ui/icons/SupervisedUserCircleTwoTone';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';
import BusinessCenterTwoToneIcon from '@material-ui/icons/BusinessCenterTwoTone';
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';
import DomainTwoToneIcon from '@material-ui/icons/DomainTwoTone';
import LocalAtmTwoToneIcon from '@material-ui/icons/LocalAtmTwoTone';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { ReactComponent as Megaphone } from '../../assets/megaphone.svg';

const drawerWidth = 260;

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
    // backgroundColor: 'rgba(0, 122, 255, 0.08) !important',
    // color: '#007AFF !important',
    fontWeight: 900,
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
    products: false,
    items: false,
    users: false,
    businessRules: false,
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
      key: 'general',
      items: [
        {
          text: 'Dashboard',
          itemKey: 'dashboard',
          path: `${match.path}`,
          icon: <DashboardTwoToneIcon style={{ color: '#0984e3' }} fontSize="large" />,
          onClick: () => handleClick(`${match.path}`),
        },
        {
          text: 'Sales',
          itemKey: 'sales',
          path: `${match.path}/sales`,
          icon: <LocalAtmTwoToneIcon style={{ color: '#218c74' }} fontSize="large" />,
          onClick: () => handleClick(`${match.path}/sales`),
        },
        {
          text: 'Customers',
          itemKey: 'customers',
          path: `${match.path}/customers`,
          icon: (
            <SupervisedUserCircleTwoToneIcon
              style={{ color: '#ff7675' }}
              fontSize="large"
            />
          ),
          onClick: () => handleClick(`${match.path}/customers`),
        },
      ],
    },
    {
      header: 'CATALOGUE',
      key: 'catalogue',
      items: [
        {
          text: 'Products',
          itemKey: 'products',
          path: `${match.path}/product`,
          icon: <LocalMallTwoToneIcon style={{ color: '#00cec9' }} fontSize="large" />,
          onClick: () => setOpen({ ...open, products: !open.products }),
          itemSubList: [
            {
              _text: 'List',
              _key: 'product-list',
              _path: `${match.path}/product/list`,
              _onClick: () => handleClick(`${match.path}/product/list`),
            },
            {
              _text: 'Create',
              _key: 'product-create',
              _path: `${match.path}/product/create`,
              _onClick: () => handleClick(`${match.path}/product/create`),
            },
          ],
        },
        {
          text: 'Product Mapping',
          itemKey: 'productMapping',
          path: `${match.path}/product-mapping`,
          icon: <RoomTwoToneIcon style={{ color: '#e84393' }} fontSize="large" />,
          // icon: (
          //   <Icon
          //     className="fas fa-map-pin"
          //     style={{ fontSize: 30, marginLeft: 8, color: '#007AFF' }}
          //   />
          // ),
          onClick: () => handleClick(`${match.path}/product-mapping`),
        },
        {
          text: 'Promotions',
          itemKey: 'promotions',
          path: `${match.path}/promotions`,
          icon: (
            <SvgIcon style={{ fontSize: 33, marginLeft: 3, color: '#54a0ff' }}>
              <Megaphone />
            </SvgIcon>
          ),
          onClick: () => handleClick(`${match.path}/promotions`),
        },
        {
          text: 'Advertisements',
          itemKey: 'advertisements',
          path: `${match.path}/advertisements`,
          icon: (
            <Icon
              className="fas fa-ad"
              style={{ fontSize: 33, marginLeft: 3, color: '#341f97' }}
            />
          ),
          onClick: () => handleClick(`${match.path}/advertisements`),
        },
      ],
    },
    {
      header: 'INVENTORY',
      key: 'inventory',
      items: [
        {
          text: 'Items',
          itemKey: 'items',
          path: `${match.path}/item`,
          icon: <LocalOfferTwoToneIcon style={{ color: '#0fbcf9' }} fontSize="large" />,
          onClick: () => setOpen({ ...open, items: !open.items }),
          itemSubList: [
            {
              _text: 'List',
              _key: 'item-list',
              _path: `${match.path}/item/list`,
              _onClick: () => handleClick(`${match.path}/item/list`),
            },
            {
              _text: 'Create',
              _key: 'item-create',
              _path: `${match.path}/item/create`,
              _onClick: () => handleClick(`${match.path}/item/create`),
            },
          ],
        },
      ],
    },
    {
      header: 'CONFIG',
      key: 'config',
      items: [
        {
          text: 'Users',
          itemKey: 'users',
          path: `${match.path}/user`,
          icon: (
            <SupervisorAccountTwoToneIcon style={{ color: '#01a3a4' }} fontSize="large" />
          ),
          onClick: () => setOpen({ ...open, users: !open.users }),
          itemSubList: [
            {
              _text: 'List',
              _key: 'user-list',
              _path: `${match.path}/user/list`,
              _onClick: () => handleClick(`${match.path}/user/list`),
            },
            {
              _text: 'Roles',
              _key: 'role-list',
              _path: `${match.path}/role/list`,
              _onClick: () => handleClick(`${match.path}/role/list`),
            },
          ],
        },

        {
          text: 'Business Rules',
          itemKey: 'businessRules',
          path: `${match.path}/business-rules`,
          icon: (
            <BusinessCenterTwoToneIcon style={{ color: '#ffc048' }} fontSize="large" />
          ),
          onClick: () => setOpen({ ...open, businessRules: !open.businessRules }),
          itemSubList: [
            {
              _text: 'List',
              _key: 'business-rules-list',
              _path: `${match.path}/business-rules/List`,
              _onClick: () => handleClick(`${match.path}/business-rules/list`),
            },
            {
              _text: 'Create',
              _key: 'business-rules-create',
              _path: `${match.path}/business-rules/Create`,
              _onClick: () => handleClick(`${match.path}/business-rules/create`),
            },
          ],
        },
        {
          text: 'Office',
          itemKey: 'office',
          path: `${match.path}/office`,
          icon: <DomainTwoToneIcon style={{ color: '#3c40c6' }} fontSize="large" />,
          // icon: (
          //   <Icon
          //     className="fas fa-building"
          //     style={{ fontSize: 33, marginLeft: 3, color: '#007AFF' }}
          //   />
          // ),
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
              {drawerList.map(({ header, key, items }) => (
                <div key={key}>
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
                  {items.map(
                    ({ text, itemKey, path, icon, onClick, itemSubList = [] }) => {
                      const isExpandable = itemSubList && itemSubList.length > 0;
                      return (
                        <div key={itemKey}>
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
                            {isExpandable && !open[itemKey] && (
                              <ExpandMore style={{ transform: 'rotate(-90deg)' }} />
                            )}
                            {isExpandable && open[itemKey] && (
                              <ExpandLess style={{ transform: 'rotate(180deg)' }} />
                            )}
                          </ListItem>
                          {isExpandable && (
                            <Collapse in={open[itemKey]} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding>
                                {itemSubList.map(({ _text, _key, _path, _onClick }) => (
                                  <ListItem
                                    button
                                    key={_key}
                                    className={classes.nested}
                                    onClick={_onClick}
                                    classes={{ selected: classes.selected }}
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
                    }
                  )}
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
