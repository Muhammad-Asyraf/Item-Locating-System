import React, { useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MyLocationIcon from '@mui/icons-material/MyLocation';

import '../../assets/css/categorySelectOverride.css';

const listItemIconStyles = { mr: 5, fontSize: '0.875rem !important' };
const IconStyles = { ml: 1, mr: 3, mt: 0.1 };

const RowMenu = (props) => {
  const storeUrl = localStorage.getItem('storeUrl');
  const [anchorEl, setAnchorEl] = useState();
  const { layout, Link, handleDelete, handleEdit } = props;

  const handleClickOption = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOption = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClickOption} sx={{ position: 'relative', right: 20 }}>
        <MoreVertRoundedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id={`actions-${layout.uuid}`}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseOption}
        PaperProps={{
          elevation: 2,
          sx: {
            overflow: 'visible',
            mt: 0.1,
            ml: -11.5,
            '& .MuiAvatar-root': {
              width: 99,
              height: 32,
              ml: -1,
              mr: 9,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 19,
              width: 10,
              height: 10,

              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem
          onClick={handleEdit}
          component={Link}
          to={`/${storeUrl}/layout/edit/${layout.uuid}`}
        >
          <ListItemIcon sx={listItemIconStyles}>
            <EditRoundedIcon fontSize="small" sx={IconStyles} />
            Layout Editor
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          onClick={handleEdit}
          component={Link}
          to={`/${storeUrl}/layout/product-mapping/${layout.uuid}`}
        >
          <ListItemIcon sx={listItemIconStyles}>
            <MyLocationIcon fontSize="small" sx={IconStyles} />
            Map Product
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={() => handleDelete(layout.uuid)}>
          <ListItemIcon sx={listItemIconStyles}>
            <DeleteRoundedIcon fontSize="small" sx={IconStyles} />
            Delete
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
};

export default RowMenu;
