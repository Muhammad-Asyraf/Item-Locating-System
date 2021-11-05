import { createSlice } from '@reduxjs/toolkit';

import { newNotiState, noNotiState } from '../states/notificationState';

const initialState = {
  message: '',
  severity: '',
  backgroundColor: '',
  color: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNewNotification: newNotiState,
    clearNotification: noNotiState,
  },
});

export const { setNewNotification, clearNotification } = notificationSlice.actions;

export const selectNotification = (state) => state.notification;

export default notificationSlice.reducer;
