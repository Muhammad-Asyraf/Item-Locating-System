import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { makeStyles } from '@mui/styles';

import AddIcon from '@mui/icons-material/Add';

import {
  selectPromotions,
  selectIsLoading,
  processed,
  processingRequest,
  quickUpdatePromotions,
} from '../../redux/features/promotionSlice';
import { processingRequest as productProcessing } from '../../redux/features/productSlice';
import { setNewNotification } from '../../redux/features/notificationSlice';

import {
  getPromotions,
  deletePromotion,
  deleteMultiplePromotions,
} from '../../redux/thunks/promotionThunk';

import PromotionListTable from '../../components/Promotions/PromotionListTable';

const getPromotionPeriod = () => ['Current & Upcoming', 'Past', 'All'];

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

const PromotionList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const promotionPeriods = getPromotionPeriod();

  const initPromotion = useSelector(selectPromotions);
  const isLoading = useSelector(selectIsLoading);

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const [promotions, setPromotions] = useState([]);
  const [currentTab, setCurrentTab] = useState(promotionPeriods[0]);

  useEffect(() => {
    (async () => {
      dispatch(processingRequest());
      const { type: getPromotionsProcessed, payload } = await dispatch(getPromotions());

      if (getPromotionsProcessed.includes('fulfilled')) {
        setPromotions(payload.promotions);
        dispatch(processed());
      }
    })();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleDelete = async (uuid) => {
    const newInitPromotion = initPromotion.filter((promotion) => promotion.uuid !== uuid);
    const newPromotions = promotions.filter((promotion) => promotion.uuid !== uuid);

    const { type } = await dispatch(deletePromotion({ uuid }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdatePromotions({ promotions: newInitPromotion }));
      setPromotions(newPromotions);

      await dispatch(
        setNewNotification({
          message: 'Item successfully deleted',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  const handleMultipleDelete = async (selected, setSelected) => {
    const newInitPromotion = initPromotion.filter(({ uuid }) => !selected.includes(uuid));
    const newPromotions = promotions.filter(({ uuid }) => !selected.includes(uuid));

    const { type } = await dispatch(deleteMultiplePromotions({ listToDelete: selected }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdatePromotions({ promotions: newInitPromotion }));
      setPromotions(newPromotions);
      setSelected([]);

      await dispatch(
        setNewNotification({
          message: 'All selected promotions successfully deleted',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  const handleEdit = () => {
    dispatch(productProcessing());
  };

  if (isLoading) {
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
    <Grid container spacing={2} style={{ marginTop: '30px' }}>
      <Grid item xs={12} container>
        <Grid item xs={8}>
          <h1 style={{ marginBottom: 3, marginTop: 3 }}>Promotions</h1>
          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
            <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Promotion&nbsp;&nbsp;</div>,
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
            to={`/${storeUrl}/promotion/create`}
          >
            <AddIcon style={{ marginRight: 10 }} fontSize="small" /> Add Promotion
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <PromotionListTable
          currentTab={currentTab}
          promotionPeriods={promotionPeriods}
          handleChangeTab={handleChangeTab}
          initPromotion={initPromotion}
          promotions={promotions}
          setPromotions={setPromotions}
          handleDelete={handleDelete}
          onMultipleDelete={handleMultipleDelete}
          handleEdit={handleEdit}
        />
      </Grid>
    </Grid>
  );
};

export default PromotionList;
