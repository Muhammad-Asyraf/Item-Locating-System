import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { selectIsLoading, processed } from '../../redux/features/itemSlice';
import { addItem } from '../../redux/thunks/itemThunk';

import ItemForm from '../../components/Items/ItemForm';
import { selectAuthHeader } from '../../redux/features/authSlice';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

const ItemCreate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(selectIsLoading);
  const authHeader = useSelector(selectAuthHeader);

  useEffect(() => {
    dispatch(processed());
  }, []);

  const handleSubmit = async (payload) => {
    const { type } = await dispatch(addItem({ payload, authHeader }));

    if (type.includes('fulfilled')) {
      history.push('/store-slug/item/list');
    }
    dispatch(processed());
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: '30px' }}>
        <Grid item sm={12} md={10}>
          <h1>Add new item </h1>
        </Grid>
      </Grid>
      <ItemForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default ItemCreate;
