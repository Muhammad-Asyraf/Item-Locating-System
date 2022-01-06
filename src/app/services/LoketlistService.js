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

// export const getDefaultCartsForUser = (authHeader, appUserID) => {
//   try {
//     let carts;
//     carts = await axiosInstance.get(
//       '/api/mobile/planning-cart-service/cart/default/:app_user_uuid',
//       {
//         params: {
//           app_user_uuid: appUserID,
//         },
//         authHeader,
//       }
//     );
//     return carts;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getAllCartsForUser = async (appUserID) => {
  const header = await getAuthHeader();
  try {
    let { data } = await axiosInstance.get(
      `/api/mobile/planning-cart-service/carts/${appUserID}`,
      header
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getCartById = (authHeader, cartID) => {
//   try {
//     let carts;
//     carts = await axiosInstance.get(
//       '/api/mobile/planning-cart-service/cart/:uuid',
//       {
//         params: {
//           uuid: cartID,
//         },
//         authHeader,
//       }
//     );
//     return carts;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createNewCart = (authHeader, appUserID, cartName) => {
//   try {
//     let carts;
//     carts = await axiosInstance.post(
//       '/api/mobile/planning-cart-service/cart/create',
//       {
//         app_user_uuid: appUserID,
//         name: cartName,
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

// export const deleteCart = (authHeader, appUserID, cartID) => {
//   try {
//     let carts;
//     carts = await axiosInstance.delete(
//       '/api/mobile/planning-cart-service/cart/delete',
//       {
//         app_user_uuid: appUserID,
//         cart_uuid: cartID,
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

// export const modifyCart = (authHeader, appUserID, cartID, cartName) => {
//   try {
//     let carts;
//     carts = await axiosInstance.patch(
//       '/api/mobile/planning-cart-service/cart/update',
//       {
//         app_user_uuid: appUserID,
//         cart_uuid: cartID,
//         name: cartName,
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

// export const saveDefaultCartAs = (authHeader, appUserID, cartID, cartName) => {
//   try {
//     let carts;
//     carts = await axiosInstance.patch(
//       '/api/mobile/planning-cart-service/cart/save',
//       {
//         app_user_uuid: appUserID,
//         cart_uuid: cartID,
//         name: cartName,
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

// /**
//  * Item CRUD methods
//  */

// export const addItemForCart = (authHeader, cartID, productID, quantity) => {
//   try {
//     let carts;
//     carts = await axiosInstance.post(
//       '/api/mobile/planning-cart-service/cart/items/add',
//       {
//         cart_uuid: cartID,
//         product_uuid: productID,
//         quantity,
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

// export const modifyItemForCart = (authHeader, cartID, productID, quantity) => {
//   try {
//     let carts;
//     carts = await axiosInstance.post(
//       '/api/mobile/planning-cart-service/cart/items/update',
//       {
//         cart_uuid: cartID,
//         product_uuid: productID,
//         quantity,
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

// export const removeItemForCart = (authHeader, cartID, productID) => {
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
