import axios from 'axios';

// Environment config
import { environment } from '../environment';

/**
 * This module contains all of the product service API calls.
 */

const axiosInstance = axios.create({
  baseURL: environment.host,
});

/**
 *
 * @param {*} queryObject = {search, uuid}
 * @returns JSONObject[]
 */
export const getProducts = async (queryObject) => {
  try {
    let paramsObject = { search: queryObject.search };
    if ('uuid' in queryObject) {
      paramsObject.uuid = queryObject.uuid;
    }
    const { data } = await axiosInstance.get(
      `/api/mobile/product-service/products`,
      {
        params: paramsObject,
      }
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};
