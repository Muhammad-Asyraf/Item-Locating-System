import React, { useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const RowMenu = (props) => {
  const storeUrl = localStorage.getItem('storeUrl');
  const [anchorEl, setAnchorEl] = useState();

  const handleClickOption = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOption = () => {
    setAnchorEl(null);
  };
  const { item, Link, handleDelete } = props;

  return (
    <>
      <IconButton onClick={handleClickOption} sx={{ position: 'relative', right: 20 }}>
        <MoreVertRoundedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id={`actions-${item.uuid}`}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseOption}
        PaperProps={{
          elevation: 2,
          sx: {
            overflow: 'visible',
            mt: -0.5,
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
        <MenuItem onClick={() => handleDelete(item.uuid)}>
          <ListItemIcon sx={{ mr: 5, fontSize: '0.875rem !important' }}>
            <DeleteRoundedIcon fontSize="small" sx={{ ml: 1, mr: 3, mt: 0.1 }} />
            Delete
          </ListItemIcon>
        </MenuItem>
        <MenuItem component={Link} to={`/${storeUrl}/item/edit/${item.uuid}`}>
          <ListItemIcon sx={{ mr: 5, fontSize: '0.875rem !important' }}>
            <EditRoundedIcon fontSize="small" sx={{ ml: 1, mr: 3, mt: 0.1 }} />
            Edit
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
};

export default RowMenu;
