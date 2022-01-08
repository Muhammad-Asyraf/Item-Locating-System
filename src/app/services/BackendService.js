import axios from 'axios';
import { getAuthHeader } from '../services/AuthenticationService';

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
  const header = await getAuthHeader();
  try {
    let { data } = await axiosInstance.get(
      `/api/mobile/app-user-service/app-user/${userID}`,
      header
    );

    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export const updateUser = async (userID, userObject) => {
  const header = await getAuthHeader();
  try {
    console.log(userObject);
    let { data } = await axiosInstance.patch(
      `/api/mobile/app-user-service/app-user/${userID}`,
      userObject,
      header
    );

    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

// passwordObject = {oldPassword,newPassword}
export const updatePassword = async (userID, passwordObject) => {
  const header = await getAuthHeader();
  try {
    console.log(passwordObject);
    let { data } = await axiosInstance.patch(
      `/api/mobile/app-user-service/app-user/${userID}/password`,
      passwordObject,
      header
    );

    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

// emailObject = {new}
export const updateEmail = async (userID, emailObject) => {
  const header = await getAuthHeader();
  try {
    console.log(emailObject);
    let { data } = await axiosInstance.patch(
      `/api/mobile/app-user-service/app-user/${userID}/email`,
      emailObject,
      header
    );

    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
    // if (error.response.data.code == undefined) {
    // }
    // return Promise.reject(new Error(error.response.data.code));
  }
};
