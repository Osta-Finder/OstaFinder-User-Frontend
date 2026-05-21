// src/services/apiSlice.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth, customBaseQuery } from './customBaseQuery';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

// Export auto-generated hooks (if needed in future)
export const {} = apiSlice;