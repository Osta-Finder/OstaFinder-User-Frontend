// src/services/apiSlice.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth, customBaseQuery } from './customBaseQuery';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ["WorkerWorks", "WorkerWork", "Requests", "RequestStats", "Rating", "Orders"],
  tagTypes: ["WorkerWorks", "WorkerWork", "Requests", "RequestStats", "Rating", "WorkerProfile", "Auth"],
  tagTypes: ["WorkerWorks", "WorkerWork", "Requests", "RequestStats", "Rating", "WorkerServices", "WorkerService"],
  endpoints: () => ({}),
});

// Export auto-generated hooks (if needed in future)
export const {} = apiSlice;