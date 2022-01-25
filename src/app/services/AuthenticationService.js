import auth from '@react-native-firebase/auth';
import axios from 'axios';

// Environment config
import { environment } from '../environment';

/**
 * This module contains all of the authentication API calls.
 */

const axiosInstance = axios.create({
  baseURL: environment.host,
});

export const getToken = async () => {
  const user = auth().currentUser;
  const token = user && (await user.getIdToken(true));
  return token;
};

export const getAuthHeader = async () => {
  //console.log(`[getAuthHeader()] Token: ${JSON.stringify(token)}`);

  return {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${await getToken()}`,
    },
  };
};

export const login = async (credentials) => {
  // Authenticate
  try {
    await auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    return `[login()] Success`;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return Promise.reject('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      return Promise.reject('That email address is invalid!');
    }

    if (error.code === 'auth/user-not-found') {
      return Promise.reject('User not found. Please sign up');
    }

    return Promise.reject(error.code);
  }
};

export const register = async (credentials) => {
  try {
    // Register backend
    await axiosInstance.post('/api/mobile/app-user-service/signup/email', {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    });
    // Then, login
    await login(credentials);
    return `[register()] Success`;
  } catch (error) {
    if (error.response.data.code === 'auth/email-already-exists') {
      return Promise.reject(
        'That email address is already in use by another account'
      );
    }
    return Promise.reject(error);
  }
};
