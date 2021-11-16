import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import IconButton from '@mui/material/IconButton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

import { makeStyles } from '@mui/styles';

import {
  // selectItems,
  selectIsLoading,
  processingRequest,
  processed,
} from '../../redux/features/itemSlice';
import { updateItem } from '../../redux/thunks/itemThunk';
import { selectAuthHeader } from '../../redux/features/authSlice';
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
  const isLoading = useSelector(selectIsLoading);
  const authHeader = useSelector(selectAuthHeader);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    barcode_number: '',
    wholesale_price: '',
  });

  const { match } = props;

  const getItemByUUID = async (uuid) => {
    try {
      const endpointURL = `/api/backoffice/item-service/item/${uuid}`;
      const res = await axios.get(endpointURL, authHeader);
      setCurrentItem(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategoryOptions = async () => {
    const endpointURL = '/api/backoffice/sub-category-service/sub-category';
    const { data } = await axios.get(endpointURL);
    setCategoryOptions(data);
  };

  useEffect(() => {
    if (currentItem.name) {
      dispatch(processed());
    }
  }, [currentItem]);

  useEffect(() => {
    dispatch(processingRequest());
    getCategoryOptions();
    getItemByUUID(match.params.uuid);
  }, []);

  const handleSubmit = async ({ uuid, formData: payload }) => {
    const { type, payload: resPayload } = await dispatch(
      updateItem({ uuid, payload, authHeader })
    );

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
    setButtonLoading(false);
  };

  if (isLoading && !buttonLoading) {
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
            buttonLoading={buttonLoading}
            setButtonLoading={setButtonLoading}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemEdit;
