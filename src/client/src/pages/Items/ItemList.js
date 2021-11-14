import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { makeStyles } from '@mui/styles';

import AddIcon from '@mui/icons-material/Add';

import { selectItems, selectIsLoading, processed } from '../../redux/features/itemSlice';
import { getItems, deleteItem, deleteMultipleItems } from '../../redux/thunks/itemThunk';
import { selectAuthHeader } from '../../redux/features/authSlice';

import ItemListTable from '../../components/Items/ItemListTable';

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

const ItemList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const itemData = useSelector(selectItems);
  const isLoading = useSelector(selectIsLoading);
  const authHeader = useSelector(selectAuthHeader);
  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');
  const [items, setItems] = React.useState([]);
  // const { history } = props;

  // console.log(history);
  useEffect(() => {
    (async () => {
      await dispatch(getItems(authHeader));
      dispatch(processed());
    })();
  }, []);

  useEffect(() => {
    if (itemData.length > 0) {
      setItems(itemData);
    }
  }, [itemData]);

  const handleDelete = async (uuid) => {
    const newItemList = items.filter((item) => item.uuid !== uuid);
    await dispatch(deleteItem({ uuid, authHeader }));
    setItems(newItemList);
  };

  const handleMultipleDelete = async (selected, setSelected) => {
    const newItemList = items.filter(({ uuid }) => !selected.includes(uuid));

    await dispatch(deleteMultipleItems({ listToDelete: selected, authHeader }));
    setItems(newItemList);
    setSelected([]);
  };

  if (isLoading) {
    return (
      <div className={classes.circular}>
        <CircularProgress size={70} color="secondary" />
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
        {/* <Grid item sm={12}>
          <div style={{ fontSize: '0.875rem', marginTop: 30 }}>
            <span>Add, view, edit and remove your inventory items all in one place.</span>
          </div>
        </Grid> */}
      </Grid>
      <Grid item xs={12}>
        <ItemListTable
          itemData={itemData}
          items={items}
          setItems={setItems}
          handleDelete={handleDelete}
          onMultipleDelete={handleMultipleDelete}
        />
      </Grid>
    </Grid>
  );
};

export default ItemList;
