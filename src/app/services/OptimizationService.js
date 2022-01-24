import axios from 'axios';
import { getAuthHeader } from '../services/AuthenticationService';

// Environment config
import { environment } from '../environment';

/**
 * This module contains all of the optimization backend API calls.
 */

const axiosInstance = axios.create({
  baseURL: environment.host,
});

/**
 * Returns the optimized path [array of coordinates] according the the stores included in a cart.
 * @param {Array} userPosition [longitude,latitude]
 * @param {*} cartID
 */
export const getOptimizedPathForCart = async (userPosition, cartID) => {
  const header = await getAuthHeader();
  let optimizedPath;
  try {
    let { data } = await axiosInstance.post(
      `/api/mobile/optimization-service/path/optimize-cart/${cartID}`,
      {
        position: userPosition,
      },
      header
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
