import axios from 'axios';
import { getAuthHeader } from './AuthenticationService';

// Environment config
import { environment } from '../environment';

/**
 * This module contains all of the cart/loketlist backend API calls.
 */

const axiosInstance = axios.create({
  baseURL: environment.host,
});

/**
 * TODO: Uncomment and finalize
 * ! Fix response vars with {data}
 * Cart/LOKETLIST CRUD methods
 */

export const getDefaultCartForUser = async (appUserID) => {
  const header = await getAuthHeader();
  try {
    const { data } = await axiosInstance.get(
      `/api/mobile/planning-cart-service/cart/default/${appUserID}`,
      header
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export const getAllCartsForUser = async (appUserID) => {
  const header = await getAuthHeader();
  try {
    let { data } = await axiosInstance.get(
      `/api/mobile/planning-cart-service/carts/${appUserID}`,
      header
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export const getCartById = async (cartID, storeID = undefined) => {
  const header = await getAuthHeader();
  try {
    let query = {};
    if (storeID && storeID != '') {
      console.log(`[LoketlistService.js/getCartById] Store uuid: ${storeID}`);
      query.store = storeID;
    }
    let { data } = await axiosInstance.get(
      `/api/mobile/planning-cart-service/cart/${cartID}`,
      {
        params: query,
        ...header,
      }
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export const createNewCart = async (appUserID, cartName) => {
  try {
    const header = await getAuthHeader();
    // Add cart to back end
    const { data } = await axiosInstance.post(
      '/api/mobile/planning-cart-service/cart/create',
      {
        app_user_uuid: appUserID,
        name: cartName,
      },
      header
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export const deleteCart = async (appUserID, cartID) => {
  try {
    const header = await getAuthHeader();
    // Add cart to back end
    const { data } = await axiosInstance.delete(
      '/api/mobile/planning-cart-service/cart/delete',
      {
        ...header,
        data: {
          app_user_uuid: appUserID,
          cart_uuid: cartID,
        },
      }
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export const modifyCart = async (appUserID, cartID, newCartName) => {
  try {
    const header = await getAuthHeader();
    // Add cart to back end
    const { data } = await axiosInstance.patch(
      '/api/mobile/planning-cart-service/cart/update',
      {
        app_user_uuid: appUserID,
        cart_uuid: cartID,
        name: newCartName,
      },
      header
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export const saveDefaultCartAs = async (appUserID, cartID, cartName) => {
  try {
    const header = await getAuthHeader();
    const { data } = await axiosInstance.patch(
      '/api/mobile/planning-cart-service/cart/save',
      {
        app_user_uuid: appUserID,
        cart_uuid: cartID,
        name: cartName,
      },
      header
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

// /**
//  * CartItem CRUD methods
//  */

export const addItemIntoCart = async (cartID, productID, quantity) => {
  const header = await getAuthHeader();
  try {
    let carts;
    carts = await axiosInstance.post(
      '/api/mobile/planning-cart-service/cart/items/add',
      {
        cart_uuid: cartID,
        product_uuid: productID,
        quantity,
      },
      header
    );
    return carts;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export const modifyItemInCart = async (cartID, productID, quantity) => {
  const header = await getAuthHeader();
  try {
    const { data } = await axiosInstance.post(
      '/api/mobile/planning-cart-service/cart/items/update',
      {
        cart_uuid: cartID,
        product_uuid: productID,
        quantity,
      },
      header
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

// export const removeItemFromCart = (authHeader, cartID, productID) => {
//   try {
//     let carts;
//     carts = await axiosInstance.delete(
//       '/api/mobile/planning-cart-service/cart/items/remove',
//       {
//         cart_uuid: cartID,
//         product_uuid: productID,
//       },
//       {
//         authHeader,
//       }
//     );
//     return carts;
//   } catch (error) {
//     console.log(error);
//   }
// };
