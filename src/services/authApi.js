// src/services/authApi.js
import { apiSlice } from './apiSlice';
import { setCredentials, logout } from '../store/slices/authSlice';
import { setCookie, deleteCookie } from '../utils/cookies';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({      
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;          
          const { user, accessToken } = data;
          // setCookie('accessToken', accessToken, 7);
          dispatch(setCredentials({ user, accessToken }));
        } catch (err) {
          // handle error in component
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          console.log("onQueryStarted");
          
          const { data } = await queryFulfilled;          
          const { user, accessToken } = data;
          // setCookie('accessToken', accessToken, 7);
          dispatch(setCredentials({ user, accessToken }));
        } catch (err) {
          console.log(err);
          
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // deleteCookie('accessToken');
          dispatch(logout());
        } catch (err) {}
      },
    }),
    getMe: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("me");
          const { user, accessToken } = data;
          // if (accessToken) setCookie('accessToken', accessToken, 7);
          dispatch(setCredentials({ user, accessToken }));
        } catch (err) {
          // handle error silently
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi;