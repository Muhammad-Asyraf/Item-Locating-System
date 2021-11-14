import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { useHistory, Link } from 'react-router-dom';

import axios from 'axios';

import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import { makeStyles } from '@mui/styles';

import ItemForm from '../../components/Items/ItemForm';
import useFirstRender from '../../hooks/useFirstRender';
import { addItem } from '../../redux/thunks/itemThunk';

import {
  selectIsLoading,
  selectItemMsg,
  processingRequest,
  processed,
} from '../../redux/features/itemSlice';
import { setNewNotification } from '../../redux/features/notificationSlice';
import { selectAuthHeader } from '../../redux/features/authSlice';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  circular: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    width: '80vw',
  },
}));

const ItemCreate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isFirstRender = useFirstRender();
  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');
  const isLoading = useSelector(selectIsLoading);
  const authHeader = useSelector(selectAuthHeader);
  const itemMessage = useSelector(selectItemMsg);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(async () => {
    dispatch(processingRequest());
    const endpointURL = '/api/backoffice/sub-category-service/sub-category';
    const { data } = await axios.get(endpointURL);
    setCategoryOptions(data);
    dispatch(processed());
  }, []);

  useEffect(async () => {
    if (!isFirstRender) {
      await dispatch(
        setNewNotification({
          message: itemMessage,
          backgroundColor: '#be0000',
        })
      );
    }
  }, [itemMessage]);

  // 9318637043002
  const handleSubmit = async (payload) => {
    const { type } = await dispatch(addItem({ payload, authHeader }));
    if (type.includes('fulfilled')) {
      history.push(`/${storeUrl}/item/list`);
      await dispatch(
        setNewNotification({
          message: 'Item successfully added.',
          backgroundColor: '#202124',
        })
      );
    } else if (type.includes('rejected')) {
      await dispatch(
        setNewNotification({
          message: itemMessage,
          backgroundColor: '#be0000',
        })
      );
    }

    dispatch(processed());
  };

  if (isLoading && isFirstRender) {
    return (
      <div className={classes.circular}>
        <CircularProgress size={70} color="secondary" />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: '30px' }}>
        <Grid item xs={12} container>
          <Grid item xs={8}>
            <h1 style={{ marginBottom: 1, marginTop: 3, fontSize: '2em' }}>
              <span> Add a new item </span>
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
              ,<div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;New Item</div>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ItemForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            categoryOptions={categoryOptions}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemCreate;
