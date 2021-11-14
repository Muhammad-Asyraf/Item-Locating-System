import React from 'react';

// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { makeStyles } from '@mui/styles';

import { ReactComponent as ReactLogo } from '../assets/svg/Ooops_404_error.svg';

const useStyles = makeStyles(() => ({
  container: {
    padding: '0px !important',
    height: '100% !important',
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          minHeight: '100vh',
        }}
      >
        <Grid item>
          <ReactLogo
            style={{
              height: '100vh',
              // width: '100vw',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
