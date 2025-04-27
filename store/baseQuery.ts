"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BaseApi } from "@/config";

const baseQueryWithReAuth = fetchBaseQuery({
  baseUrl: BaseApi,
});

export const BaseQueryParams = (reducerPath: string, tags: string[]) => {
  const baseQuery = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: () => ({}),
    reducerPath,
    tagTypes: tags?.length ? tags : [],
  });

  return baseQuery;
};
