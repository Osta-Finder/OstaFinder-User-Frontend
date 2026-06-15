import { apiSlice } from "./apiSlice";

export const aiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendAiMessage: builder.mutation({
      query: (body) => ({
        url: "/ai/chat",
        method: "POST",
        body,
      }),
    }),
    getChatSession: builder.query({
      query: () => ({
        url: "/ai/session",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSendAiMessageMutation, useLazyGetChatSessionQuery } = aiApi;
