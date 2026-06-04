import { apiSlice } from './apiSlice';

export const workerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: '/workers/stats',
        method: 'GET',
      }),
      providesTags: ['WorkerStats'],
    }),
    getDashboardRequests: builder.query({
      query: () => ({
        url: '/workers/dashboard-requests',
        method: 'GET',
      }),
      providesTags: ['WorkerRequests'],
    }),
    getIncomingRequests: builder.query({
      query: () => ({
        url: '/workers/requests',
        method: 'GET',
      }),
      providesTags: ['WorkerRequests'],
    }),
    updateRequestStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/workers/requests/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['WorkerRequests', 'WorkerStats'],
    }),
    getWorkerServices: builder.query({
      query: () => ({
        url: '/workers/services',
        method: 'GET',
      }),
      providesTags: ['WorkerServices'],
    }),
    getWorkerServiceById: builder.query({
      query: (id) => ({
        url: `/workers/services/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'WorkerServices', id }],
    }),
    addWorkerService: builder.mutation({
      query: (data) => ({
        url: '/workers/services',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['WorkerServices'],
    }),
    updateWorkerService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/workers/services/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'WorkerServices', id }, 'WorkerServices'],
    }),
    deleteWorkerService: builder.mutation({
      query: (id) => ({
        url: `/workers/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WorkerServices'],
    }),
    getWorkerWorks: builder.query({
      query: () => ({
        url: '/workers/works',
        method: 'GET',
      }),
      providesTags: ['WorkerWorks'],
    }),
    getWorkerWorkById: builder.query({
      query: (id) => ({
        url: `/workers/works/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'WorkerWorks', id }],
    }),
    addWorkerWork: builder.mutation({
      query: (data) => ({
        url: '/workers/works',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['WorkerWorks'],
    }),
    updateWorkerWork: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/workers/works/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'WorkerWorks', id }, 'WorkerWorks'],
    }),
    deleteWorkerWork: builder.mutation({
      query: (id) => ({
        url: `/workers/works/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WorkerWorks'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDashboardStatsQuery,
  useGetDashboardRequestsQuery,
  useGetIncomingRequestsQuery,
  useUpdateRequestStatusMutation,
  useGetWorkerServicesQuery,
  useGetWorkerServiceByIdQuery,
  useAddWorkerServiceMutation,
  useUpdateWorkerServiceMutation,
  useDeleteWorkerServiceMutation,
  useGetWorkerWorksQuery,
  useGetWorkerWorkByIdQuery,
  useAddWorkerWorkMutation,
  useUpdateWorkerWorkMutation,
  useDeleteWorkerWorkMutation,
} = workerApi;
