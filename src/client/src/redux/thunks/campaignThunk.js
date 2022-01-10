import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeader from '../../services/firebase/getHeader';

export const getSingleCampaign = createAsyncThunk(
  'campaign/getSingleCampaign',
  async ({ uuid }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = `/api/backoffice/marketing-campaign-service/campaign/${uuid}`;

      const { data } = await axios.get(endpointURL, authHeader);

      return {
        campaign: data,
        message: 'Successfully retrieved campaign',
        status: 'ok',
      };
    } catch (err) {
      const { data } = err.response;

      return rejectWithValue({
        message: 'Failed in retrieving campaign',
        status: 'Error!',
        error: data.code,
      });
    }
  }
);

export const getCampaigns = createAsyncThunk(
  'campaign/getCampaigns',
  async (args, { rejectWithValue }) => {
    try {
      const storeUuid = localStorage.getItem('storeUUID');
      const endpointURL = `/api/backoffice/marketing-campaign-service/campaigns/${storeUuid}`;
      const authHeader = await getHeader();

      const { data } = await axios.get(endpointURL, authHeader);

      return {
        campaigns: data,
        message: 'Successfully retrieved campaigns',
        status: 'ok',
      };
    } catch (err) {
      const { data } = err.response;

      return rejectWithValue({
        message: 'Failed in retrieving campaigns',
        status: 'Error!',
        error: data.code,
      });
    }
  }
);

export const addCampaign = createAsyncThunk(
  'campaign/addCampaign',
  async ({ payload }, { rejectWithValue }) => {
    try {
      const endpointURL = '/api/backoffice/marketing-campaign-service/campaign';
      const authHeader = await getHeader();

      await axios.post(endpointURL, payload, authHeader);

      return true;
    } catch (err) {
      const { data } = err.response;

      return rejectWithValue({
        message: data.message,
        status: 'Error!',
        error: data.code,
      });
    }
  }
);

export const deleteCampaign = createAsyncThunk(
  'campaign/deleteCampaign',
  async ({ uuid }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = `/api/backoffice/marketing-campaign-service/campaign/${uuid}`;

      await axios.delete(endpointURL, authHeader);

      return true;
    } catch (err) {
      console.log('error', err);
      const { data } = err.response;

      return rejectWithValue({
        message: data.message,
        status: 'Error!',
        error: data.code,
      });
    }
  }
);

export const deleteMultipleCampaigns = createAsyncThunk(
  'campaign/deleteMultipleCampaigns',
  async ({ listToDelete }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = '/api/backoffice/marketing-campaign-service/campaign/delete';

      await axios.post(endpointURL, { listToDelete }, authHeader);

      return true;
    } catch (err) {
      console.log('error', err);
      const { data } = err.response;

      return rejectWithValue({
        message: data.message,
        status: 'Error!',
        error: data.code,
      });
    }
  }
);

export const updateCampaign = createAsyncThunk(
  'campaign/updateCampaign',
  async ({ uuid, payload }, { rejectWithValue }) => {
    try {
      const endpointURL = `/api/backoffice/marketing-campaign-service/campaign/${uuid}`;
      const authHeader = await getHeader();

      await axios.put(endpointURL, payload, authHeader);

      return true;
    } catch (err) {
      console.log('error', err);
      const { data } = err.response;

      return rejectWithValue({
        message: data.message,
        status: 'Error!',
        error: data.code,
      });
    }
  }
);