import React, { useEffect, useState } from 'react';
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

import { addPromotion } from '../../redux/thunks/promotionThunk';
import { getProducts } from '../../redux/thunks/productThunk';
import { getSubcategories } from '../../redux/thunks/categoryThunk';
import { getCampaigns } from '../../redux/thunks/campaignThunk';

import {
  selectCampaigns,
  processed as campaignProcessed,
} from '../../redux/features/campaignSlice';
import {
  selectIsLoading as promotionLoading,
  processingRequest,
  processed as promotionProcessed,
} from '../../redux/features/promotionSlice';
import {
  selectProducts,
  selectIsLoading as productLoading,
  processed as productProcessed,
} from '../../redux/features/productSlice';
import {
  selectSubcategory,
  processed as categoryProcessed,
} from '../../redux/features/categorySlice';
import { setNewNotification } from '../../redux/features/notificationSlice';

import PromotionForm from '../../components/Promotions/PromotionForm';

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

const PromotionCreate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const [overlapDateError, setOverlapDateError] = useState([]);

  const isProductLoading = useSelector(productLoading);
  const isPromotionLoading = useSelector(promotionLoading);
  const products = useSelector(selectProducts);
  const campaigns = useSelector(selectCampaigns);
  const categoryOptions = useSelector(selectSubcategory);

  useEffect(async () => {
    dispatch(promotionProcessed());
    await dispatch(getProducts());
    await dispatch(getSubcategories());
    await dispatch(getCampaigns());
    dispatch(productProcessed());
    dispatch(campaignProcessed());
    dispatch(categoryProcessed());
  }, []);

  console.log('products', products);

  const handleSubmit = async (payload) => {
    dispatch(processingRequest());

    const { type, payload: resPayload } = await dispatch(addPromotion({ payload }));

    if (type.includes('fulfilled')) {
      // history.push(`/${storeUrl}/promotion/list`);
      console.log(history);
      await dispatch(
        setNewNotification({
          message: 'Promotion successfully created',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    } else if (type.includes('rejected')) {
      const err = JSON.parse(resPayload.message);
      // console.log('resPayload', err);
      setOverlapDateError(err.message);
      await dispatch(
        setNewNotification({
          message: 'Overlap Promotional Dates Error',
          backgroundColor: '#be0000',
          severity: 'error',
        })
      );
    }
    dispatch(promotionProcessed());
  };

  if (isProductLoading) {
    return (
      <div>
        <LinearProgress
          className={classes.linear}
          sx={{
            backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
          }}
        />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: '50px' }}>
        <Grid item xs={0.65} />
        <Grid item xs={7} container>
          <Grid item xs={8}>
            <h1 style={{ marginBottom: 1, marginTop: 3, fontSize: '2em' }}>
              <span> Add a new promotion</span>
              <IconButton
                component={Link}
                to={`/${storeUrl}/promotion/list`}
                sx={{ position: 'relative', top: -3, left: 5 }}
              >
                <KeyboardReturnRoundedIcon fontSize="large" color="primary" />
              </IconButton>
            </h1>
            <Breadcrumbs separator="•" aria-label="breadcrumb">
              <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
              <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Promotion&nbsp;&nbsp;</div>,
              <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;New Promotion</div>
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
            form="promotion-form"
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              textTransform: 'none',
              fontSize: '0.95rem',
              borderRadius: 3,
              width: 105,
              height: 50,
              paddingRight: 2.5,
              boxShadow: 'rgba(53, 132, 167, 0.44) 0px 8px 16px 0px !important',
            }}
          >
            {isPromotionLoading ? (
              <CircularProgress size={25} style={{ color: 'white' }} />
            ) : (
              <>
                <SaveRoundedIcon style={{ marginRight: 10 }} fontSize="small" /> Save
              </>
            )}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <PromotionForm
            onSubmit={handleSubmit}
            products={products}
            campaigns={campaigns}
            categoryOptions={categoryOptions}
            overlapDateError={overlapDateError}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PromotionCreate;
