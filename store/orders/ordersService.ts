"use client";

import { IOrderResponse } from "@/types/orders";
import { BaseQueryParams } from "../baseQuery";

export const ordersService = BaseQueryParams("orders", [
  "ORDER",
]).injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IOrderResponse[], string>({
      query: (userId) => ({
        url: `/orders/${userId}`,
        method: "GET",
      }),
      providesTags: ["ORDER"],
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["ORDER"],
    }),
  }),
});
export const { useGetOrdersQuery, useCreateOrderMutation } = ordersService;
