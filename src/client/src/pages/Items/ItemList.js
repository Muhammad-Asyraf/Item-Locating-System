import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';

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
  const [items, setItems] = React.useState([]);

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
    <div className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: '30px' }}>
        <Grid item sm={12} md={10}>
          <h1>Inventory Items</h1>
        </Grid>
        <Grid item sm={12} md={2}>
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={classes.addButton}
            component={Link}
            to="/store-slug/item/create"
          >
            <AddIcon style={{ marginRight: 10 }} /> New Item
          </Button>
        </Grid>
      </Grid>
      <ItemListTable
        items={items}
        handleDelete={handleDelete}
        onMultipleDelete={handleMultipleDelete}
      />
    </div>
  );
};

export default ItemList;
