import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
// import CircularProgress from '@mui/material/CircularProgress';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
// import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Tooltip from '@mui/material/Tooltip';

import { makeStyles } from '@mui/styles';

import { selectIsLoading, processed } from '../../redux/features/layoutSlice';
import { setNewNotification } from '../../redux/features/notificationSlice';
import { addLayout } from '../../redux/thunks/layoutThunk';

import LayoutEditor from '../../components/StoreLayout/LayoutEditor';

const useStyles = makeStyles(() => ({
  linear: {
    position: 'relative',
    top: '10px !important',
    left: '-45px !important',
    width: '100vw',
    height: '7px !important',
  },
  floorLocked: {
    fontSize: '0.875rem',
    background: '#d32f2f',
    padding: '5px 10px 5px 10px',
    color: 'white',
    borderRadius: '5px',
    fontWeight: 'bold',
    position: 'absolute ',
    top: 218,
    left: 350,
    zIndex: '450',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  zoomLevel: {
    fontSize: '0.875rem',
    background: 'black',
    padding: '5px 10px 5px 10px',
    color: 'white',
    borderRadius: '5px',
    fontWeight: 'bold',
    position: 'absolute ',
    top: 218,
    right: 120,
    zIndex: '450',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
}));

const LayoutCreate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [floorIsLocked, setFloorIsLocked] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [floorPlan, setFloorPlan] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const isLayoutLoading = useSelector(selectIsLoading);
  console.log(isLayoutLoading);

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const handleOpenDetailsDialog = () => setOpenDetailsDialog(true);
  const handleCloseDetailsDialog = () => setOpenDetailsDialog(false);

  const saveLayout = async (payload) => {
    const { type, payload: resPayload } = await dispatch(addLayout({ payload }));

    if (type.includes('fulfilled')) {
      dispatch(processed());
      history.push(`/${storeUrl}/layout/edit/${resPayload}`);

      await dispatch(
        setNewNotification({
          message: 'Layout successfully created',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    } else if (type.includes('rejected')) {
      dispatch(processed());
      await dispatch(
        setNewNotification({
          message: resPayload.message,
          backgroundColor: '#be0000',
          severity: 'error',
        })
      );
    }
  };

  const uploadFloorPlan = ({ target }) => {
    const uploadedFloorPlanPath = URL.createObjectURL(target.files[0]);
    setFloorPlan({ file: target.files[0], path: uploadedFloorPlanPath });
  };

  const removeFloorPlan = () => {
    setFloorPlan(null);
  };

  return (
    <Grid container spacing={2} style={{ marginTop: '30px' }}>
      <Grid item xs={8} container>
        <Grid item xs={12}>
          <h1 style={{ marginBottom: 1, marginTop: 3, fontSize: '2em' }}>
            <span>Layout Editor</span>
            <IconButton
              component={Link}
              to={`/${storeUrl}/layout/list`}
              sx={{ position: 'relative', top: -3, left: 5 }}
            >
              <KeyboardReturnRoundedIcon fontSize="large" color="primary" />
            </IconButton>
          </h1>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <Breadcrumbs separator="•" aria-label="breadcrumb">
                <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
                <div style={{ fontSize: '0.875rem' }}>
                  &nbsp;&nbsp;Layout Editor&nbsp;&nbsp;
                </div>
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={4}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Box
          style={{
            padding: '3px 12px',
            borderRadius: 10,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            // 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
            // 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
            // 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
          }}
        >
          {floorPlan ? (
            <Tooltip title="Remove Layout" placement="top">
              <IconButton color="primary" onClick={removeFloorPlan} size="small">
                <RemoveCircleIcon style={{ color: '#d32f2f' }} fontSize="large" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Upload Floor Plan" placement="top">
              <IconButton
                component="label"
                sx={{ position: 'relative', top: 1.5 }}
                color="primary"
                size="small"
              >
                <FileUploadRoundedIcon color="primary" fontSize="large" />
                <input
                  id="imgs"
                  name="imgCollection"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={uploadFloorPlan}
                  autoComplete="off"
                  style={{ display: 'none' }}
                />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Save Layout" placement="top">
            <IconButton
              form="layout-form"
              variant="contained"
              color="primary"
              type="submit"
              size="small"
            >
              <SaveRoundedIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Layout Details" placement="top">
            <IconButton color="primary" size="small" onClick={handleOpenDetailsDialog}>
              <InfoRoundedIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
        {/* <Button
          form="layout-form"
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            textTransform: 'none',
            fontSize: '0.95rem',
            borderRadius: 3,
            height: 50,
            width: '30%',
            paddingRight: 3,
            boxShadow: 'rgba(53, 132, 167, 0.44) 0px 8px 16px 0px !important',
          }}
        >
          {isLayoutLoading ? (
            <CircularProgress size={25} style={{ color: 'white' }} />
          ) : (
            <>
              <SaveRoundedIcon style={{ marginRight: 10 }} fontSize="small" /> Save
            </>
          )}
        </Button> */}
      </Grid>

      <Grid item xs={10}>
        {floorIsLocked ? <div className={classes.floorLocked}>Floor Locked</div> : null}
        <div className={classes.zoomLevel}>Zoom Level: {zoomLevel}</div>
        <LayoutEditor
          mode="create"
          floorPlan={floorPlan}
          setFloorIsLocked={setFloorIsLocked}
          setZoomLevel={setZoomLevel}
          saveLayout={saveLayout}
          open={openDetailsDialog}
          handleClose={handleCloseDetailsDialog}
        />
      </Grid>
    </Grid>
  );
};

export default LayoutCreate;
