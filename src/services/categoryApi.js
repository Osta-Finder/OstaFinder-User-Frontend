import { apiSlice } from "./apiSlice";
export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});
export const { useGetCategoriesQuery } = categoryApi;
