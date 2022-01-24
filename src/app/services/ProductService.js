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

/**
 * Get products with query params
 * @param {*} queryObject = {search, uuid}
 * @returns JSONObject[]
 */
export const getProducts = async (queryObject) => {
  const header = await getAuthHeader();
  try {
    let paramsObject = { search: queryObject.search };
    if ('uuid' in queryObject) {
      paramsObject.uuid = queryObject.uuid;
    }
    if ('category' in queryObject) {
      paramsObject.category = queryObject.category;
    } else if ('subcategory' in queryObject) {
      paramsObject.subcategory = queryObject.subcategory;
    }

    const { data } = await axiosInstance.get(
      `/api/mobile/product-service/products`,
      {
        params: paramsObject,
        ...header,
      }
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

/**
 * Get list of categories
 * @returns Array of Category objects
 */
export const getCategories = async () => {
  const header = await getAuthHeader();
  try {
    const { data } = await axiosInstance.get(
      `/api/mobile/product-service/categories`,
      header
    );

    //console.log(`[ProductService.js/getCategories] ${data}`);
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

/**
 * Get list of subcategories from a category
 * @param {*} categoryUUID
 * @returns Array of SubCategory objects
 */
export const getSubCategories = async (categoryUUID) => {
  const header = await getAuthHeader();
  try {
    const { data } = await axiosInstance.get(
      `/api/mobile/product-service/categories/${categoryUUID}`,
      header
    );

    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};
