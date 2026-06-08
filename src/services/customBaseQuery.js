// src/services/customBaseQuery.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productionURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
let refreshPromise = null;

export const customBaseQuery = fetchBaseQuery({
  baseUrl: productionURL,
  credentials: "include",
});
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await customBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!refreshPromise) {
      const refreshResult = await customBaseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
        },
        api,
        extraOptions,
      );
    }
    if (refreshResult.data) {
      result = await customBaseQuery(args, api, extraOptions);
    } else {
      console.log("logout user");
    }
  }

  return result;
};
