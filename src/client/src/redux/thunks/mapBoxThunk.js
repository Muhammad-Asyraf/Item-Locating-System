import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getLocation = createAsyncThunk(
  'mapbox/getLocation',
  async ({ latitude, longitude, mapboxToken }, { rejectWithValue }) => {
    try {
      const endpointURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=1&access_token=${mapboxToken}`;
      const res = await axios.get(endpointURL);

      return {
        data: res.data,
        message: 'Successfully retrieved location',
        status: 'ok',
      };
    } catch (err) {
      return rejectWithValue({
        message: err,
        status: 'Error!',
        error: 'ttt',
      });
    }
  }
);

export default getLocation;
