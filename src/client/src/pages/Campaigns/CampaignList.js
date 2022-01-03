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
  selectCampaigns,
  selectIsLoading,
  processed,
  processingRequest,
  quickUpdateCampaigns,
} from '../../redux/features/campaignSlice';
import { setNewNotification } from '../../redux/features/notificationSlice';

import {
  getCampaigns,
  deleteCampaign,
  deleteMultipleCampaigns,
} from '../../redux/thunks/campaignThunk';

import CampaignListTable from '../../components/Campaigns/CampaignListTable';

const getCampaignPeriod = () => ['Current & Upcoming', 'Past', 'All'];

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

const CampaignList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const campaignPeriods = getCampaignPeriod();

  const initCampaign = useSelector(selectCampaigns);
  const isLoading = useSelector(selectIsLoading);

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const [campaigns, setCampaigns] = useState([]);
  const [currentTab, setCurrentTab] = useState(campaignPeriods[0]);

  useEffect(() => {
    (async () => {
      dispatch(processingRequest());
      const { type: getCampaignsProcessed, payload } = await dispatch(getCampaigns());

      if (getCampaignsProcessed.includes('fulfilled')) {
        setCampaigns(payload.campaigns);
        dispatch(processed());
      }
    })();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleDelete = async (uuid) => {
    const newInitCampaign = initCampaign.filter((campaign) => campaign.uuid !== uuid);
    const newCampaigns = campaigns.filter((campaign) => campaign.uuid !== uuid);

    const { type } = await dispatch(deleteCampaign({ uuid }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateCampaigns({ campaigns: newInitCampaign }));
      setCampaigns(newCampaigns);

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
    const newInitCampaign = initCampaign.filter(({ uuid }) => !selected.includes(uuid));
    const newCampaigns = campaigns.filter(({ uuid }) => !selected.includes(uuid));

    const { type } = await dispatch(deleteMultipleCampaigns({ listToDelete: selected }));

    if (type.includes('fulfilled')) {
      dispatch(quickUpdateCampaigns({ campaigns: newInitCampaign }));
      setCampaigns(newCampaigns);
      setSelected([]);

      await dispatch(
        setNewNotification({
          message: 'All selected campaigns successfully deleted',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    }
  };

  const handleEdit = () => {
    // dispatch(processingCategory());
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
          <h1 style={{ marginBottom: 3, marginTop: 3 }}>Marketing Campaign</h1>
          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
            <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Marketing&nbsp;&nbsp;</div>,
            <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Campaign&nbsp;&nbsp;</div>,
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
            <AddIcon style={{ marginRight: 10 }} fontSize="small" /> Add Campaign
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CampaignListTable
          currentTab={currentTab}
          campaignPeriods={campaignPeriods}
          handleChangeTab={handleChangeTab}
          initCampaign={initCampaign}
          campaigns={campaigns}
          setCampaigns={setCampaigns}
          handleDelete={handleDelete}
          onMultipleDelete={handleMultipleDelete}
          handleEdit={handleEdit}
        />
      </Grid>
    </Grid>
  );
};

export default CampaignList;
