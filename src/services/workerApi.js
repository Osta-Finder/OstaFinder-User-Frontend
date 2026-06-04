import { apiSlice } from "./apiSlice";

export const workerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopWorkers: builder.query({
      query: () => ({
        url: "/workers/top-by-category",
        method: "GET",
      }),
    }),
    getFilteredWorkers: builder.query({
      query: (filters) => ({
        url: `/workers${filters}`,
        method: "GET",
      }),
    }),
  }),
    overrideExisting: false,
});
export const { useGetTopWorkersQuery, useGetFilteredWorkersQuery } = workerApi;
