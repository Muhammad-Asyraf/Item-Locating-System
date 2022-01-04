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
    return Promise.reject(error.response.data.message);
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
    return Promise.reject(error.response.data.message);
  }
};

// passwordObject = {oldPassword,newPassword}
export const updatePassword = async (userID, passwordObject) => {
  try {
    console.log(passwordObject);
    let { data } = await axiosInstance.patch(
      `/api/mobile/app-user-service/app-user/${userID}/password`,
      passwordObject
    );

    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

// emailObject = {new}
export const updateEmail = async (userID, emailObject) => {
  try {
    console.log(emailObject);
    let { data } = await axiosInstance.patch(
      `/api/mobile/app-user-service/app-user/${userID}/email`,
      emailObject
    );

    return data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
    // if (error.response.data.code == undefined) {
    // }
    // return Promise.reject(new Error(error.response.data.code));
  }
};
