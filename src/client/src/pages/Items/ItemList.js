import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { makeStyles } from '@mui/styles';

import AddIcon from '@mui/icons-material/Add';

import {
  selectItems,
  selectIsLoading,
  processed,
  processingRequest,
  quickUpdateItems,
} from '../../redux/features/itemSlice';
import { processingRequest as processingCategory } from '../../redux/features/categorySlice';
import { setNewNotification } from '../../redux/features/notificationSlice';

import { getSubcategories } from '../../redux/thunks/categoryThunk';
import { getItems, deleteItem, deleteMultipleItems } from '../../redux/thunks/itemThunk';

import ItemListTable from '../../components/Items/ItemListTable';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  linear: {
    position: 'relative',
    top: '10px !important',
    left: '-45px !important',
    width: '100vw',
    height: '7px !important',
  },
  // circular: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: '80vh',
  //   width: '100%',
  // },
}));

const ItemList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initItem = useSelector(selectItems);
  const isLoading = useSelector(selectIsLoading);

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const [items, setItems] = useState([]);
  const [triggeredOnce, setTriggeredOnce] = useState(false);

  useEffect(() => {
    (async () => {
      dispatch(processingRequest());
      await dispatch(getItems());
      await dispatch(getSubcategories());
      dispatch(processed());
    })();
  }, []);

  useEffect(() => {
    if (initItem.length > 0 && !triggeredOnce) {
      setItems(initItem);
      setTriggeredOnce(true);
    }
  }, [initItem]);

  const handleDelete = async (uuid) => {
    const newInitItem = initItem.filter((item) => item.uuid !== uuid);
    const newItems = items.filter((item) => item.uuid !== uuid);

    const { type } = await dispatch(deleteItem({ uuid }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateItems({ items: newInitItem }));
      setItems(newItems);

      await dispatch(
        setNewNotification({
          message: 'Item successfully deleted',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  const handleMultipleDelete = async (selected, setSelected) => {
    const newInitItem = initItem.filter(({ uuid }) => !selected.includes(uuid));
    const newItems = items.filter(({ uuid }) => !selected.includes(uuid));

    const { type } = await dispatch(deleteMultipleItems({ listToDelete: selected }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateItems({ items: newInitItem }));
      setItems(newItems);
      setSelected([]);

      await dispatch(
        setNewNotification({
          message: 'All selected items successfully deleted',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  const handleEdit = () => {
    dispatch(processingCategory());
  };

  if (isLoading) {
    return (
      <div>
        <LinearProgress
          className={classes.linear}
          sx={{
            backgroundImage:
              'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
          }}
        />
      </div>
    );
  }

  return (
    <Grid container spacing={2} style={{ marginTop: '30px' }}>
      <Grid item xs={12} container>
        <Grid item xs={8}>
          <h1 style={{ marginBottom: 3, marginTop: 3 }}>Inventory Items</h1>
          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
            <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Inventory&nbsp;&nbsp;</div>,
            <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Items&nbsp;&nbsp;</div>,
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
            sx={{
              textTransform: 'none',
              fontSize: '0.95rem',
              borderRadius: 3,
              height: 50,
              paddingRight: 3,
              boxShadow: 'rgba(53, 132, 167, 0.44) 0px 8px 16px 0px !important',
            }}
            component={Link}
            to={`/${storeUrl}/item/create`}
          >
            <AddIcon style={{ marginRight: 10 }} fontSize="small" /> New Item
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ItemListTable
          initItem={initItem}
          items={items}
          setItems={setItems}
          handleDelete={handleDelete}
          onMultipleDelete={handleMultipleDelete}
          handleEdit={handleEdit}
        />
      </Grid>
    </Grid>
  );
};

export default ItemList;
