import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { makeStyles } from '@mui/styles';

import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';

import {
  selectLayouts,
  selectIsLoading,
  processingRequest,
  processed,
  quickUpdateLayouts,
  clearLayout,
} from '../../redux/features/layoutSlice';
import { setNewNotification } from '../../redux/features/notificationSlice';

import {
  getLayouts,
  deleteLayout,
  deleteMultipleLayouts,
  patchSingleLayout,
  patchMultipleLayouts,
} from '../../redux/thunks/layoutThunk';

import LayoutListTable from '../../components/StoreLayout/LayoutListTable';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  linear: {
    position: 'relative',
    top: '10px !important',
    left: '-45px !important',
    width: '100vw',
    height: '7px !important',
  },
  addButton: {
    height: '50px',
    width: 200,
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    marginLeft: '50% !important',
    paddingRight: 20,
    borderRadius: '8px',
    boxShadow: 'rgb(30 136 229 / 24%) 0px 8px 16px 0px',
    textTransform: 'none',
  },
}));

/* eslint-disable no-unneeded-ternary */
const LayoutList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initLayout = useSelector(selectLayouts);
  const isLayoutLoading = useSelector(selectIsLoading);

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const [layouts, setLayouts] = useState([]);

  useEffect(() => {
    (async () => {
      dispatch(clearLayout());
      dispatch(processingRequest());
      const { type: getLayoutsProcessed, payload } = await dispatch(getLayouts());

      if (getLayoutsProcessed.includes('fulfilled')) {
        setLayouts(payload.layouts);
        dispatch(processed());
      }
    })();
  }, []);

  const handleEdit = () => {
    dispatch(processingRequest());
  };

  const handleDelete = async (uuid) => {
    const newinitLayout = initLayout.filter((item) => item.uuid !== uuid);
    const newLayouts = layouts.filter((item) => item.uuid !== uuid);

    const { type } = await dispatch(deleteLayout({ uuid }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateLayouts({ layouts: newinitLayout }));
      setLayouts(newLayouts);

      await dispatch(
        setNewNotification({
          message: 'Chosen layout successfully deleted',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  const handleMultipleDelete = async (selected, setSelected) => {
    const newinitLayout = initLayout.filter(({ uuid }) => !selected.includes(uuid));
    const newLayouts = layouts.filter(({ uuid }) => !selected.includes(uuid));
    const payload = { listToDelete: selected };

    const { type } = await dispatch(deleteMultipleLayouts({ payload }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateLayouts({ layouts: newinitLayout }));
      setLayouts(newLayouts);
      setSelected([]);

      await dispatch(
        setNewNotification({
          message: 'All selected layouts successfully deleted',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  const handleToggleStatus = async (uuid, status) => {
    const payload = { is_active: !status };
    const newinitLayout = initLayout.map((layout) => {
      if (layout.uuid === uuid) {
        return {
          ...layout,
          is_active: !status,
        };
      }
      return layout;
    });

    const newLayouts = layouts.map((layout) => {
      if (layout.uuid === uuid) {
        return {
          ...layout,
          is_active: !status,
        };
      }
      return layout;
    });

    const { type } = await dispatch(patchSingleLayout({ uuid, payload }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateLayouts({ layouts: newinitLayout }));
      setLayouts(newLayouts);

      await dispatch(
        setNewNotification({
          message: 'Layout active status successfully updated',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  const handleMultipleToggleStatus = async (selected, status, setSelected, handleClose) => {
    const updatedStatus = status === 'activate' ? true : false;
    const payload = {
      listToUpdate: selected,
      updatedPayload: {
        is_active: updatedStatus,
      },
    };

    const newinitLayout = initLayout.map((layout) => {
      if (selected.includes(layout.uuid)) {
        return {
          ...layout,
          is_active: updatedStatus,
        };
      }
      return layout;
    });

    const newLayouts = layouts.map((layout) => {
      if (selected.includes(layout.uuid)) {
        return {
          ...layout,
          is_active: updatedStatus,
        };
      }
      return layout;
    });

    const { type } = await dispatch(patchMultipleLayouts({ payload }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateLayouts({ layouts: newinitLayout }));
      setLayouts(newLayouts);
      setSelected([]);
      handleClose();

      await dispatch(
        setNewNotification({
          message: 'All selected layouts status successfully updated',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  if (isLayoutLoading) {
    return (
      <div>
        <LinearProgress
          className={classes.linear}
          sx={{
            backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
          }}
        />
      </div>
    );
  }

  return (
    <Grid container spacing={2} style={{ marginTop: '30px' }}>
      <Grid item xs={12} container>
        <Grid item xs={8}>
          <h1 style={{ marginBottom: 3, marginTop: 3 }}>Layouts</h1>
          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
            <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Layout&nbsp;&nbsp;</div>,
            <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;List</div>
          </Breadcrumbs>
        </Grid>
        <Grid
          item
          sm={4}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            type="button"
            component={Link}
            to={`/${storeUrl}/layout/create`}
            sx={{
              textTransform: 'none',
              fontSize: '0.95rem',
              borderRadius: 3,
              height: 50,
              paddingRight: 3,
              boxShadow: 'rgba(53, 132, 167, 0.44) 0px 8px 16px 0px !important',
            }}
          >
            <NoteAddRoundedIcon style={{ marginRight: 10 }} fontSize="small" />
            New Layout
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <LayoutListTable
          initLayout={initLayout}
          layouts={layouts}
          layoutLoading={isLayoutLoading}
          setLayouts={setLayouts}
          handleDelete={handleDelete}
          onMultipleDelete={handleMultipleDelete}
          onMultipleActiveStatusUpdate={handleMultipleToggleStatus}
          handleToggleStatus={handleToggleStatus}
          handleEdit={handleEdit}
        />
      </Grid>
    </Grid>
  );
};

export default LayoutList;
