import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
// import { loadCSS } from 'fg-loadcss';

import { Drawer as MUIDrawer, useMediaQuery } from '@mui/material';
// import Divider from '@mui/material/Divider';
import Hidden from '@mui/material/Hidden';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import SvgIcon from '@mui/material/SvgIcon';
import Divider from '@mui/material/Divider';

// import Icon from '@mui/material/Icon';
import SupervisorAccountTwoToneIcon from '@mui/icons-material/SupervisorAccountTwoTone';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DeveloperBoardRoundedIcon from '@mui/icons-material/DeveloperBoardRounded';

import { makeStyles, useTheme } from '@mui/styles';

import { ReactComponent as Megaphone } from '../../../assets/megaphone.svg';

const drawerWidth = 228;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    boxShadow:
      'rgb(159 162 191 / 18%) 2px 0px 3px, rgb(159 162 191 / 32%) 1px 0px 1px !important',
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
    fontSize: '10px !important',
    color: 'rgba(0, 0, 0, 0.9) !important',
  },
  selected: {
    backgroundColor: 'rgba(53,132,167, 0.15) !important',
    fontWeight: 900,
    '&::before': {
      display: 'block !important',
    },
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
  // linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)
  const drawerList = [
    {
      header: 'GENERAL',
      key: 'general',
      items: [
        {
          text: 'Dashboard',
          itemKey: 'dashboard',
          path: `${match.path}/dashboard`,
          icon: (
            <DashboardTwoToneIcon
              // style={{ color: '#3584A7' }}
              sx={{ fill: 'url(#linearColors)' }}
              fontSize="large"
            />
          ),
          onClick: () => handleClick(`${match.path}/dashboard`),
        },
        {
          text: 'Sales',
          itemKey: 'sales',
          path: `${match.path}/sales`,
          icon: (
            <LocalAtmTwoToneIcon sx={{ fill: 'url(#linearColors)' }} fontSize="large" />
          ),
          onClick: () => handleClick(`${match.path}/sales`),
        },
        {
          text: 'Customers',
          itemKey: 'customers',
          path: `${match.path}/customers`,
          icon: (
            <SupervisedUserCircleTwoToneIcon
              sx={{ fill: 'url(#linearColors)' }}
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
          icon: (
            <LocalMallTwoToneIcon sx={{ fill: 'url(#linearColors)' }} fontSize="large" />
          ),
          onClick: () => setOpen({ ...open, products: !open.products }),
          itemSubList: [
            {
              _text: 'List',
              _key: 'product-list',
              _icon: (
                <FormatListBulletedRoundedIcon
                  sx={{ fill: 'url(#linearColors)' }}
                  fontSize="medium"
                />
              ),
              _path: `${match.path}/product/list`,
              _onClick: () => handleClick(`${match.path}/product/list`),
            },
            {
              _text: 'Create',
              _key: 'product-create',
              _icon: (
                <AddCircleTwoToneIcon
                  sx={{ fill: 'url(#linearColors)' }}
                  fontSize="medium"
                />
              ),
              _path: `${match.path}/product/create`,
              _onClick: () => handleClick(`${match.path}/product/create`),
            },
          ],
        },
        {
          text: 'Product Mapping',
          itemKey: 'productMapping',
          path: `${match.path}/product-mapping`,
          icon: <RoomTwoToneIcon sx={{ fill: 'url(#linearColors)' }} fontSize="large" />,
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
            <SvgIcon
              style={{ fontSize: 33, marginLeft: 3 }}
              sx={{ fill: 'url(#linearColors)' }}
            >
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
            <DeveloperBoardRoundedIcon
              sx={{ fill: 'url(#linearColors)' }}
              fontSize="large"
            />
          ),
          // icon: (
          //   <Icon
          //     className="fab fa-adversal"
          //     style={{
          //       fontSize: 33,
          //       marginLeft: 3,
          //       fill: 'url(#linearColors) !important',
          //     }}
          //   />
          // ),
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
          icon: (
            <LocalOfferTwoToneIcon sx={{ fill: 'url(#linearColors)' }} fontSize="large" />
          ),
          onClick: () => setOpen({ ...open, items: !open.items }),
          itemSubList: [
            {
              _text: 'List',
              _key: 'item-list',
              _icon: (
                <FormatListBulletedRoundedIcon
                  sx={{ fill: 'url(#linearColors)' }}
                  fontSize="medium"
                />
              ),
              _path: `${match.path}/item/list`,
              _onClick: () => handleClick(`${match.path}/item/list`),
            },
            {
              _text: 'Create',
              _key: 'item-create',
              _icon: (
                <AddCircleTwoToneIcon
                  sx={{ fill: 'url(#linearColors)' }}
                  fontSize="medium"
                />
              ),
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
            <SupervisorAccountTwoToneIcon
              sx={{ fill: 'url(#linearColors)' }}
              fontSize="large"
            />
          ),
          onClick: () => setOpen({ ...open, users: !open.users }),
          itemSubList: [
            {
              _text: 'List',
              _key: 'user-list',
              _icon: (
                <FormatListBulletedRoundedIcon
                  sx={{ fill: 'url(#linearColors)' }}
                  fontSize="medium"
                />
              ),
              _path: `${match.path}/user/list`,
              _onClick: () => handleClick(`${match.path}/user/list`),
            },
            {
              _text: 'Roles',
              _key: 'role-list',
              _icon: (
                <AccountCircleTwoToneIcon
                  sx={{ fill: 'url(#linearColors)' }}
                  fontSize="medium"
                />
              ),
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
            <BusinessCenterTwoToneIcon
              sx={{ fill: 'url(#linearColors)' }}
              fontSize="large"
            />
          ),
          onClick: () => setOpen({ ...open, businessRules: !open.businessRules }),
          itemSubList: [
            {
              _text: 'List',
              _key: 'business-rules-list',
              _icon: (
                <FormatListBulletedRoundedIcon
                  sx={{ fill: 'url(#linearColors)' }}
                  fontSize="medium"
                />
              ),
              _path: `${match.path}/business-rules/List`,
              _onClick: () => handleClick(`${match.path}/business-rules/list`),
            },
            {
              _text: 'Create',
              _key: 'business-rules-create',
              _icon: (
                <AddCircleTwoToneIcon
                  sx={{ fill: 'url(#linearColors)' }}
                  fontSize="medium"
                />
              ),
              _path: `${match.path}/business-rules/Create`,
              _onClick: () => handleClick(`${match.path}/business-rules/create`),
            },
          ],
        },
        {
          text: 'Office',
          itemKey: 'office',
          path: `${match.path}/office`,
          icon: (
            <DomainTwoToneIcon sx={{ fill: 'url(#linearColors)' }} fontSize="large" />
          ),
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

  // useEffect(() => {
  //   const node = loadCSS(
  //     'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
  //     document.querySelector('#font-awesome-css')
  //   );

  //   return () => {
  //     node.parentNode.removeChild(node);
  //   };
  // }, []);

  return (
    <Hidden
      mdDown={type === 'Desktop' && true}
      mdUp={type === 'Mobile' && true}
      implementation="css"
    >
      <MUIDrawer
        container={type === 'Mobile' ? container : null}
        PaperProps={{ elevation: 2.5 }}
        classes={{
          paper: type === 'Mobile' ? classes.drawerPaper : classes.drawerPaperCurve,
        }}
        variant={type === 'Mobile' ? 'temporary' : 'permanent'}
        anchor="left"
        open={type === 'Mobile' && status}
        onClose={type === 'Mobile' ? handleDrawerToggle : null}
      >
        {/* <div style={{ height: '2000px', overflow: 'hidden' }}> */}
        <>
          <PerfectScrollbar
            options={{
              wheelPropagation: false,
            }}
          >
            {/* <Divider /> */}
            <List>
              {drawerList.map(({ header, key, items }) => (
                <div key={key}>
                  <ListSubheader
                    disableSticky
                    style={{
                      letterSpacing: 1.8,
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
                            sx={{
                              '&:before': {
                                top: '0px',
                                right: '0px',
                                width: '3px',
                                bottom: '0px',
                                content: '""',
                                display: 'none',
                                position: 'absolute',
                                borderTopLeftRadius: '4px',
                                borderBottomLeftRadius: '4px',
                                backgroundColor: '#3584A7',
                              },
                            }}
                          >
                            <ListItemIcon
                              className={classes.listItemIcons}
                              sx={{ mr: -1.5 }}
                            >
                              <svg width={0} height={0}>
                                <linearGradient
                                  id="linearColors"
                                  x1={0}
                                  y1={0}
                                  x2={1.5}
                                  y2={1}
                                >
                                  <stop offset="0%" stopColor="#473B7B" />
                                  <stop offset="51%" stopColor="#3584A7" />
                                  <stop offset="100%" stopColor="#30D2BE" />
                                </linearGradient>
                              </svg>
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
                                {itemSubList.map(
                                  ({ _text, _key, _path, _onClick, _icon }) => (
                                    <ListItem
                                      button
                                      key={_key}
                                      className={classes.nested}
                                      onClick={_onClick}
                                      classes={{ selected: classes.selected }}
                                      selected={location.pathname === _path}
                                      sx={{
                                        '&:before': {
                                          top: '0px',
                                          right: '0px',
                                          width: '3px',
                                          bottom: '0px',
                                          content: '""',
                                          display: 'none',
                                          position: 'absolute',
                                          borderTopLeftRadius: '4px',
                                          borderBottomLeftRadius: '4px',
                                          backgroundColor: '#3584A7',
                                        },
                                      }}
                                    >
                                      <ListItemIcon sx={{ ml: 2 }}>
                                        {_icon}
                                        {/* <Icon
                                        className="fas fa-circle"
                                        style={{ fontSize: 5, marginLeft: 30 }}
                                      /> */}
                                      </ListItemIcon>
                                      <ListItemText sx={{ ml: -1.5 }}>
                                        {_text}
                                      </ListItemText>
                                    </ListItem>
                                  )
                                )}
                              </List>
                            </Collapse>
                          )}
                        </div>
                      );
                    }
                  )}
                  <br />
                  <Divider />
                </div>
              ))}
            </List>
          </PerfectScrollbar>
        </>
      </MUIDrawer>
    </Hidden>
  );
};

export default withRouter(Drawer);
