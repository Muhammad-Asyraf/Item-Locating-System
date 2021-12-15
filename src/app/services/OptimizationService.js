import axios from 'axios';

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
  let optimizedPath;
  console.log(userPosition);
  axiosInstance
    .post(`/api/mobile/optimization-service/path/optimize-cart/${cartID}`, {
      position: userPosition,
    })
    .then((res) => {
      optimizedPath = res.data;
      return optimizedPath;
    })
    .catch((error) => {
      console.log(error);
    });
};
