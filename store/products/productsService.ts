"use client";
import { IProductResponse } from "@/types/products";
import { BaseQueryParams } from "../baseQuery";

export const productsService = BaseQueryParams("products", [
  "PRODUCT",
]).injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProductResponse[], unknown>({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),
      providesTags: ["PRODUCT"],
    }),
    createProducts: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["PRODUCT"],
    }),
  }),
});
export const { useGetProductsQuery, useCreateProductsMutation } =
  productsService;
