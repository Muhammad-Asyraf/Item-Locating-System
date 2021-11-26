import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { useHistory, Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import { makeStyles } from '@mui/styles';

import { getSubcategories } from '../../redux/thunks/categoryThunk';
import { getSingleProduct, updateProduct } from '../../redux/thunks/productThunk';
import { getItems } from '../../redux/thunks/itemThunk';

import {
  selectSingleProduct,
  selectIsLoading as productLoading,
  // processingRequest,
  processed,
} from '../../redux/features/productSlice';
import {
  selectSubcategory,
  processingRequest as processingCatRequest,
  processed as catProcessed,
  selectIsLoading as categoryLoading,
} from '../../redux/features/categorySlice';
import { selectItems } from '../../redux/features/itemSlice';
import { setNewNotification } from '../../redux/features/notificationSlice';

import ProductEditForm from '../../components/Products/ProductEditForm';

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

const ProductEdit = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const isProductLoading = useSelector(productLoading);
  const isCategoryLoading = useSelector(categoryLoading);
  const categoryOptions = useSelector(selectSubcategory);
  const inventoryItems = useSelector(selectItems);
  const currentProduct = useSelector(selectSingleProduct);

  const { match } = props;

  useEffect(async () => {
    dispatch(processingCatRequest());
    await dispatch(getSingleProduct({ uuid: match.params.uuid }));
    await dispatch(getItems());
    await dispatch(getSubcategories());
    dispatch(catProcessed());
    dispatch(processed());
  }, []);

  const handleSubmit = async (payload) => {
    const { type, payload: resPayload } = await dispatch(
      updateProduct({ uuid: match.params.uuid, payload })
    );

    if (type.includes('fulfilled')) {
      await dispatch(
        setNewNotification({
          message: 'Product successfully updated',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
      history.push(`/${storeUrl}/product/list`);
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

  // console.log('dfsdfsdf', currentProduct);

  return (
    <div className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: '50px' }}>
        <Grid item xs={0.65} />
        <Grid item xs={7} container>
          <Grid item xs={12}>
            <h1 style={{ marginBottom: 1, marginTop: 3, fontSize: '2em' }}>
              <span> Add a new product</span>
              <IconButton
                component={Link}
                to={`/${storeUrl}/product/list`}
                sx={{ position: 'relative', top: -3 }}
              >
                <KeyboardReturnRoundedIcon fontSize="large" color="primary" />
              </IconButton>
            </h1>
            <Breadcrumbs separator="•" aria-label="breadcrumb">
              <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
              <div style={{ fontSize: '0.875rem' }}>
                &nbsp;&nbsp;Catalogue&nbsp;&nbsp;
              </div>
              ,
              <div style={{ fontSize: '0.875rem' }}>
                &nbsp;&nbsp;{currentProduct.uuid}
              </div>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid
          item
          sm={3.8}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            form="product-form"
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              textTransform: 'none',
              fontSize: '0.95rem',
              borderRadius: 3,
              height: 50,
              paddingRight: 3,
              boxShadow: 'rgba(53, 132, 167, 0.44) 0px 8px 16px 0px !important',
            }}
          >
            {isProductLoading ? (
              <CircularProgress size={25} style={{ color: 'white' }} />
            ) : (
              <>
                <SaveRoundedIcon style={{ marginRight: 10 }} fontSize="small" /> Save
              </>
            )}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ProductEditForm
            onSubmit={handleSubmit}
            items={inventoryItems}
            categoryOptions={categoryOptions}
            currentProduct={currentProduct}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductEdit;
