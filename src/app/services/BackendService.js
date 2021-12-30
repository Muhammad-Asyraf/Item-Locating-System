import axios from 'axios';

// Environment config
import { environment } from '../environment';

/**
 * This module contains all of the remaining backend API calls.
 */

const axiosInstance = axios.create({
  baseURL: environment.host,
});

/**
 * User API
 */
export const getUser = async (userID) => {
  try {
    let { data } = await axiosInstance.get(
      `/api/mobile/app-user-service/app-user/${userID}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (userID, userObject) => {
  try {
    console.log(userObject);
    let { data } = await axiosInstance.patch(
      `/api/mobile/app-user-service/app-user/${userID}`,
      userObject
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
