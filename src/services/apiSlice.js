import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    // Auth endpoints
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => '/auth/me',
    }),

    // Worker endpoints
    submitOnboarding: builder.mutation({
      query: (formData) => ({
        url: '/worker/onboarding',
        method: 'POST',
        body: formData,
      }),
    }),
    getOnboardingStatus: builder.query({
      query: () => '/worker/onboarding/status',
    }),
    getWorkerProfile: builder.query({
      query: (workerId) => `/worker/${workerId}`,
    }),
    getWorkers: builder.query({
      query: (params) => ({
        url: '/worker',
        params,
      }),
    }),

    // Service endpoints
    createService: builder.mutation({
      query: (serviceData) => ({
        url: '/service',
        method: 'POST',
        body: serviceData,
      }),
    }),
    getWorkerServices: builder.query({
      query: () => '/service/worker/services',
    }),
    getServices: builder.query({
      query: (params) => ({
        url: '/service/search',
        params,
      }),
    }),
    getServiceById: builder.query({
      query: (serviceId) => `/service/${serviceId}`,
    }),
    updateService: builder.mutation({
      query: ({ serviceId, ...data }) => ({
        url: `/service/${serviceId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteService: builder.mutation({
      query: (serviceId) => ({
        url: `/service/${serviceId}`,
        method: 'DELETE',
      }),
    }),

    // Client endpoints
    getClientProfile: builder.query({
      query: () => '/client/profile',
    }),
    updateClientProfile: builder.mutation({
      query: (profileData) => ({
        url: '/client/profile',
        method: 'PUT',
        body: profileData,
      }),
    }),
    createRequest: builder.mutation({
      query: (requestData) => ({
        url: '/client/requests',
        method: 'POST',
        body: requestData,
      }),
    }),
    getClientRequests: builder.query({
      query: () => '/client/requests',
    }),
    getRequestById: builder.query({
      query: (requestId) => `/client/requests/${requestId}`,
    }),
    updateRequest: builder.mutation({
      query: ({ requestId, ...data }) => ({
        url: `/client/requests/${requestId}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useSubmitOnboardingMutation,
  useGetOnboardingStatusQuery,
  useGetWorkerProfileQuery,
  useGetWorkersQuery,
  useCreateServiceMutation,
  useGetWorkerServicesQuery,
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetClientProfileQuery,
  useUpdateClientProfileMutation,
  useCreateRequestMutation,
  useGetClientRequestsQuery,
  useGetRequestByIdQuery,
  useUpdateRequestMutation,
} = apiSlice;