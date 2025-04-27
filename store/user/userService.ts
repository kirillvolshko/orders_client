"use client";

import { IProfileResponse } from "@/types/user";
import { BaseQueryParams } from "../baseQuery";

export const userService = BaseQueryParams("user", ["USER"]).injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IProfileResponse, string>({
      query: (userId) => ({
        url: `/profile/${userId}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const { useGetProfileQuery } = userService;
