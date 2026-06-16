// src/services/authApi.js
import { apiSlice } from './apiSlice';
import { setCredentials, logout } from '../store/slices/authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Auth'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user } = data;
          dispatch(setCredentials({ user }));
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
          dispatch(logout());
        } catch (err) {
          console.log(err);
        }
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
          const { user } = data;
          dispatch(setCredentials({ user: data }));
        } catch (err) {
          console.log(err);
          // handle error silently
        }
      },
    }),
    updateMe: builder.mutation({
      query: (data) => ({
        url: '/auth/me',
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user || data }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),
    updateAddress: builder.mutation({
      query: ({ addressId, data }) => ({
        url: `/auth/addresses/${addressId}`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user || data }));
        } catch (err) {
          console.log(err);
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
  useUpdateMeMutation,
  useUploadImageMutation,
  useChangePasswordMutation,
  useUpdateAddressMutation,
} = authApi;
