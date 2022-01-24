import axios from 'axios';
import { getAuthHeader } from '../services/AuthenticationService';

// Environment config
import { environment } from '../environment';

/**
 * This module contains all of the product service API calls.
 */

const axiosInstance = axios.create({
  baseURL: environment.host,
});

export const getStores = async () => {
  const header = await getAuthHeader();
  try {
    const { data } = await axiosInstance.get(
      '/api/mobile/store-service/stores',
      header
    );

    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export const getStoreById = async (uuid) => {
  const header = await getAuthHeader();
  try {
    const { data } = await axiosInstance.get(
      '/api/mobile/store-service/stores',
      {
        params: { uuid },
        ...header,
      }
    );

    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

/**
 *
 * @param {*} uuid Store uuid
 * @param {*} type 'promotional'|'bitl'
 * @returns Array of product objects
 */
export const getProductsForStore = async (uuid, type) => {
  const header = await getAuthHeader();
  try {
    const { data } = await axiosInstance.get(
      '/api/mobile/store-service/stores/products',
      {
        params: { uuid, type },
        ...header,
      }
    );

    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export const getCampaignsForStore = async (uuid) => {
  const header = await getAuthHeader();
  try {
    const { data } = await axiosInstance.get(
      `/api/mobile/store-service/stores/${uuid}/campaigns`,
      header
    );

    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};
