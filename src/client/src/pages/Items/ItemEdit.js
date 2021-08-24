import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

import {
  // selectItems,
  selectIsLoading,
  processingRequest,
  processed,
} from '../../redux/features/itemSlice';
import { updateItem } from '../../redux/thunks/itemThunk';
import { selectAuthHeader } from '../../redux/features/authSlice';

import ItemEditForm from '../../components/Items/ItemEditForm';

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

const ItemEdit = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(selectIsLoading);
  const authHeader = useSelector(selectAuthHeader);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    barcode_number: '',
    quantity: '',
    descriptions: '',
    wholesale_price: '',
  });

  const { match } = props;

  const getItemByUUID = async (uuid) => {
    try {
      const endpointURL = `/api/backoffice/item-service/item/${uuid}`;
      const res = await axios.get(endpointURL, authHeader);
      setCurrentItem(res.data);
      dispatch(processed());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(processingRequest());
    getItemByUUID(match.params.uuid);
  }, []);

  const handleSubmit = async ({ uuid, payload }) => {
    const { type } = await dispatch(updateItem({ uuid, payload, authHeader }));

    if (type.includes('fulfilled')) {
      history.push('/store-slug/item/list');
    }
    dispatch(processed());
  };

  if (isLoading) {
    return (
      <div className={classes.circular}>
        <CircularProgress size={70} color="secondary" />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: '30px' }}>
        <Grid item sm={12} md={10}>
          <h1>Edit item </h1>
        </Grid>
      </Grid>
      <ItemEditForm
        match={match}
        onSubmit={handleSubmit}
        currentItem={currentItem}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ItemEdit;
