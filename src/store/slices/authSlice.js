// src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getCookie, deleteCookie } from '../../utils/cookies';

// Initialize state from cookies if present
const initialState = {
  user: null,
  accessToken: getCookie('accessToken') || null,
  isAuthenticated: !!getCookie('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      console.log(user);
      
      state.accessToken = accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      deleteCookie('accessToken');
    },
    hydrate: (state) => {
      const token = getCookie('accessToken');
      if (token) {
        state.accessToken = token;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { setCredentials, logout, hydrate } = authSlice.actions;
export default authSlice.reducer;