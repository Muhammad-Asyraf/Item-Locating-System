import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
// import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  header: {
    padding: 10,
    // backgroundColor: 'rgb(235 237 239)',
    // backgroundColor: 'rgb(244, 246, 248)',
    backgroundColor: 'rgb(17, 25, 42) !important',
    color: 'white',
    // color: 'black',
  },
  btn: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08) !important',
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [mouseDown, setMouseDown] = useState(false);

  const { toggleProductBucket, onDrag, selectedQty, reset } = props;

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.addEventListener('mouseup', handleMouseUp);
      setMouseDown(false);
    };
  }, []);

  useEffect(() => {
    const ratio = window.devicePixelRatio;
    const handleMouseMove = (e) => onDrag(e.movementX / ratio, e.movementY / ratio);

    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDown, onDrag]);

  const handleMouseDown = () => setMouseDown(true);

  return (
    <Box
      className={classes.header}
      onMouseDown={handleMouseDown}
      style={{
        cursor: mouseDown ? 'grabbing' : 'pointer',
        // fontWeight: 'bold',
        paddingTop: 15,
        paddingBottom: 5,
      }}
    >
      <Grid container>
        <Grid item xs={7} container justifyContent="flex-start" alignItems="center">
          {/* &nbsp;&nbsp;&nbsp;&nbsp; <Inventory2RoundedIcon sx={{ fontSize: '1.1rem' }} /> */}
          &nbsp;&nbsp;Unassigned Products Bucket
        </Grid>
        <Grid item xs={5} container justifyContent="flex-end" alignItems="center">
          {selectedQty > 0 && (
            <span
              style={{
                fontSize: '0.8rem',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                borderRadius: 8,
                padding: '5px 8px 5px 8px',
                marginRight: 4,
              }}
            >
              <b>{selectedQty} &nbsp;selected</b>
            </span>
          )}
          <IconButton classes={{ root: classes.btn }} onClick={reset}>
            <RefreshRoundedIcon style={{ color: 'white' }} sx={{ fontSize: '1.1rem' }} />
          </IconButton>
          <IconButton onClick={toggleProductBucket} classes={{ root: classes.btn }}>
            <ClearRoundedIcon style={{ color: 'white' }} sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
