import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';

import Modal from '@mui/material/Modal';

const style = {
  width: '80vw',
  height: '60vh',
  bgcolor: 'white',
  borderRadius: 4,
  padding: 2,
};

const PartitionProductModal = (props) => {
  const { handleClose, openPartitionModal } = props;

  const [checked, setChecked] = useState(true);

  const handleClick = ({ target }) => {
    if (target.id === 'product-list-modal') {
      setChecked(false);
      setTimeout(() => {
        handleClose();
        setChecked(true);
      }, 200);
    }
  };

  return (
    <Modal open={openPartitionModal}>
      <Grid
        id="product-list-modal"
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100vh', width: '100vw' }}
        onClick={handleClick}
      >
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          <Box sx={style}>Test</Box>
        </Slide>
      </Grid>
    </Modal>
  );
};

export default PartitionProductModal;
