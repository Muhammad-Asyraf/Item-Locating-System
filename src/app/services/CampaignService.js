import axios from 'axios';
import { getAuthHeader } from '../services/AuthenticationService';

// Environment config
import { environment } from '../environment';

/**
 * This module contains all of the campaign backend API calls.
 */

const axiosInstance = axios.create({
  baseURL: environment.host,
});

export const getAllCampaigns = async () => {
  const header = await getAuthHeader();
  try {
    let { data } = await axiosInstance.get(
      '/api/mobile/campaign-service/campaigns',
      header
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export const getCampaignProducts = async (campaignUUID) => {
  const header = await getAuthHeader();
  try {
    let { data } = await axiosInstance.get(
      `/api/mobile/campaign-service/campaign/${campaignUUID}/products`,
      header
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};
