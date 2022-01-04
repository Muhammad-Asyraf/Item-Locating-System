import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    const email = credentials.email;
    const password = credentials.password;

    let userToken = null;
    let status = null;
    let message = '';
    let headerPayload = {};

    // Authenticate with firebase
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);

      status = 'Success';
      userToken = await user.getIdToken(false);

      // Create header
      headerPayload = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userToken}`,
        },
      };

      return {
        user: user.toJSON(),
        authHeader: headerPayload,
        status,
      };
    } catch (error) {
      console.log(error);
      status = 'Error';
      message = error;

      return thunkAPI.rejectWithValue({
        status,
        message,
      });
    }
  }
);

// Logout

// Register
