import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { useNavigate, Link, useParams } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import { makeStyles } from '@mui/styles';

import { updateCampaign, getSingleCampaign } from '../../redux/thunks/campaignThunk';

import {
  selectSingleCampaign,
  selectIsLoading as campaignLoading,
  processingRequest,
  processed as campaignProcessed,
} from '../../redux/features/campaignSlice';
import { setNewNotification } from '../../redux/features/notificationSlice';

import CampaignEditForm from '../../components/Campaigns/CampaignEditForm';

import { getFileObject } from '../../utils/general';

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

const CampaignEdit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uuid: CampaignUUID } = useParams();

  const storeUrl = localStorage.getItem('storeUrl');
  const storeName = localStorage.getItem('storeName');

  const isCampaignLoading = useSelector(campaignLoading);
  const currentCampaign = useSelector(selectSingleCampaign);

  const [refresh, setRefresh] = useState(true);
  const [initImage, setInitImage] = useState(null);

  useEffect(async () => {
    const { type: requestStatus, payload: campaignPayload } = await dispatch(
      getSingleCampaign({ uuid: CampaignUUID })
    );
    const requestStatusOk = requestStatus.includes('fulfilled');
    const { campaign } = campaignPayload;

    if (requestStatusOk) {
      const { banner_ad_path: path } = campaign;
      const file = await getFileObject(path);

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const updatedImagesPreview = { name: file.name, path: img.src };
        setInitImage({
          img,
          imgFile: file,
          imgPreview: updatedImagesPreview,
        });
        dispatch(campaignProcessed());
        setRefresh(false);
      };
    }
  }, []);

  const handleSubmit = async (payload) => {
    dispatch(processingRequest());

    const { type, payload: resPayload } = await dispatch(
      updateCampaign({ uuid: CampaignUUID, payload })
    );

    if (type.includes('fulfilled')) {
      navigate(`/${storeUrl}/marketing-campaign/list`);
      // console.log(history);
      await dispatch(
        setNewNotification({
          message: 'Campaign successfully updated',
          backgroundColor: 'green',
          severity: 'success',
        })
      );
    } else if (type.includes('rejected')) {
      await dispatch(
        setNewNotification({
          message: resPayload.message,
          backgroundColor: '#be0000',
          severity: 'error',
        })
      );
    }
    dispatch(campaignProcessed());
  };

  if (isCampaignLoading && refresh) {
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
          <Grid item xs={12}>
            <h1 style={{ marginBottom: 1, marginTop: 3, fontSize: '2em' }}>
              <span> Edit marketing campaign</span>
              <IconButton
                component={Link}
                to={`/${storeUrl}/marketing-campaign/list`}
                sx={{ position: 'relative', top: -3, left: 5 }}
              >
                <KeyboardReturnRoundedIcon fontSize="large" color="primary" />
              </IconButton>
            </h1>
            <Breadcrumbs separator="•" aria-label="breadcrumb">
              <div style={{ fontSize: '0.875rem' }}>{storeName}&nbsp;&nbsp;</div>,
              <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Marketing&nbsp;&nbsp;</div>,
              <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;Edit Campaign</div>
              <div style={{ fontSize: '0.875rem' }}>&nbsp;&nbsp;{currentCampaign.uuid}</div>
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
            form="campaign-form"
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
            {isCampaignLoading ? (
              <CircularProgress size={25} style={{ color: 'white' }} />
            ) : (
              <>
                <SaveRoundedIcon style={{ marginRight: 10 }} fontSize="small" /> Save
              </>
            )}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <CampaignEditForm
            currentCampaign={currentCampaign}
            initImage={initImage}
            onSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CampaignEdit;
