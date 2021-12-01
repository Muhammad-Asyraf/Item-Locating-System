import React from 'react';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { useHistory, Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
// import LinearProgress from '@mui/material/LinearProgress';
// import CircularProgress from '@mui/material/CircularProgress';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
// import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

// import { makeStyles } from '@mui/styles';

import Map from '../../components/ProductMapping/Map';

// const useStyles = makeStyles(() => ({
//   linear: {
//     position: 'relative',
//     top: '10px !important',
//     left: '-45px !important',
//     width: '100vw',
//     height: '7px !important',
//   },
//   paper: {
//     // width: '100%',
//     // padding: 30,
//     marginTop: 10,
//     // marginBottom: theme.spacing(2),
//     boxShadow:
//       'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24)
// 0px 16px 32px -4px !important',
//     borderRadius: '16px !important',
//   },
// }));

const LayoutEditor = () => {
  // const classes = useStyles();

  // const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  // if (isCategoryLoading) {
  //   return (
  //     <div>
  //       <LinearProgress
  //         className={classes.linear}
  //         sx={{
  //           backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
  //         }}
  //       />
  //     </div>
  //   );
  // }

  return (
    <Grid container spacing={2} style={{ marginTop: '30px' }}>
      <Grid item xs={12} container>
        <Grid item xs={8}>
          <h1 style={{ marginBottom: 1, marginTop: 3, fontSize: '2em' }}>
            <span>Layout Editor</span>
            <IconButton
              // component={Link}
              // to={`/${storeUrl}/product/list`}
              sx={{ position: 'relative', top: -3 }}
            >
              <KeyboardReturnRoundedIcon fontSize="large" color="primary" />
            </IconButton>
          </h1>
          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
            <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Layout Editor&nbsp;&nbsp;</div>,
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        {/* <Paper className={classes.paper}>
          <Map />
        </Paper> */}
        <Map />
      </Grid>
    </Grid>
  );
};

export default LayoutEditor;
