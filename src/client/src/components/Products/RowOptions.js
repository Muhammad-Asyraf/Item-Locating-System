import React, { useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const RowMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState();
  const storeUrl = localStorage.getItem('storeUrl');
  const handleClickOption = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOption = () => {
    setAnchorEl(null);
  };
  const { product, Link, handleDelete } = props;

  return (
    <>
      <IconButton onClick={handleClickOption}>
        <MoreVertRoundedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id={`actions-${product.uuid}`}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseOption}
        PaperProps={{
          style: {
            boxShadow:
              'rgba(145, 158, 171, 0.15) 0px 0px 2px 0px, rgba(145, 158, 171, 0.15) 0px 16px 32px -4px',
            borderRadius: '10px',
            outline: '0px',
            top: '10px !important',
          },
        }}
      >
        <MenuItem onClick={() => handleDelete(product.uuid)}>
          <DeleteRoundedIcon style={{ padding: 5, fontSize: 30 }} />
          Delete
        </MenuItem>
        <MenuItem component={Link} to={`/${storeUrl}/product/edit/${product.uuid}`}>
          <EditRoundedIcon style={{ padding: 5, fontSize: 30 }} />
          Edit
        </MenuItem>
      </Menu>
    </>
  );
};

export default RowMenu;
