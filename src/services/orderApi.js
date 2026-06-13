import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation({
      query: ({ workerId, orderData }) => ({
        url: `/orders/${workerId}`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi;