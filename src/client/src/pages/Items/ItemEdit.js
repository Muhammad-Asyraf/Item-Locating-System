import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

import { makeStyles } from '@mui/styles';

import { updateItem, getSingleItem } from '../../redux/thunks/itemThunk';
import { getSubcategories } from '../../redux/thunks/categoryThunk';

import {
  selectSingleItem,
  selectIsLoading as itemLoading,
  processed,
} from '../../redux/features/itemSlice';
import {
  // processingRequest as processingCatRequest,
  processed as categoryProcessed,
  selectIsLoading as categoryLoading,
  selectSubcategory,
} from '../../redux/features/categorySlice';
import { setNewNotification } from '../../redux/features/notificationSlice';

import ItemEditForm from '../../components/Items/ItemEditForm';

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
}));

const ItemEdit = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const isItemLoading = useSelector(itemLoading);
  const isCategoryLoading = useSelector(categoryLoading);
  const currentItem = useSelector(selectSingleItem);
  const categoryOptions = useSelector(selectSubcategory);

  const { match } = props;

  useEffect(async () => {
    await dispatch(getSubcategories());
    await dispatch(getSingleItem({ uuid: match.params.uuid }));
    dispatch(categoryProcessed());
    dispatch(processed());
  }, []);

  const handleSubmit = async ({ uuid, formData: payload }) => {
    const { type, payload: resPayload } = await dispatch(updateItem({ uuid, payload }));

    if (type.includes('fulfilled')) {
      await dispatch(
        setNewNotification({
          message: 'Item successfully edited',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
      history.push(`/${storeUrl}/item/list`);
    } else if (type.includes('rejected')) {
      await dispatch(
        setNewNotification({
          message: resPayload.message,
          backgroundColor: '#be0000',
          severity: 'error',
        })
      );
    }
    dispatch(processed());
  };

  if (isCategoryLoading) {
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
    <div className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: '30px' }}>
        <Grid item xs={12} container>
          <Grid item xs={8}>
            <h1 style={{ marginBottom: 1, marginTop: 3, fontSize: '2em' }}>
              <span> Edit item </span>
              <IconButton
                component={Link}
                to={`/${storeUrl}/item/list`}
                sx={{ position: 'relative', top: -3 }}
              >
                <KeyboardReturnRoundedIcon fontSize="large" color="primary" />
              </IconButton>
            </h1>
            <Breadcrumbs separator="•" aria-label="breadcrumb">
              <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
              <div style={{ fontSize: '0.875rem' }}>
                &nbsp;&nbsp;Inventory&nbsp;&nbsp;
              </div>
              ,<div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;{currentItem.uuid}</div>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ItemEditForm
            match={match}
            onSubmit={handleSubmit}
            currentItem={currentItem}
            categoryOptions={categoryOptions}
            isItemLoading={isItemLoading}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemEdit;
