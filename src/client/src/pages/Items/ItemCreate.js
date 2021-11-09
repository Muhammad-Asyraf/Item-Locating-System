import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';

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
  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');
  const isLoading = useSelector(selectIsLoading);
  const authHeader = useSelector(selectAuthHeader);

  useEffect(() => {
    dispatch(processed());
  }, []);

  const handleSubmit = async (payload) => {
    const { type } = await dispatch(addItem({ payload, authHeader }));

    if (type.includes('fulfilled')) {
      history.push(`/${storeUrl}/item/list`);
    }
    dispatch(processed());
  };

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
          {/* <Grid
            item
            xs={4}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton component={Link} to={`/${storeUrl}/item/list`}>
              <KeyboardReturnRoundedIcon fontSize="large" />
            </IconButton>
          </Grid> */}
        </Grid>
        <Grid item xs={12}>
          <ItemForm onSubmit={handleSubmit} isLoading={isLoading} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemCreate;
