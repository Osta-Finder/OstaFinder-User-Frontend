import { apiSlice } from "./apiSlice";

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation({
      query: (contactData) => ({
        url: "/contacts",
        method: "POST",
        body: contactData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSubmitContactMutation } = contactApi;
