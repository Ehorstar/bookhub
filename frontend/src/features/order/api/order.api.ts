import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Order, OrderRequest } from "../../../entities/Order/model/types";
import { cartApi } from "../../cart/api/cart.api";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["Order", "Cart"],
  endpoints: (builder) => ({
    checkout: builder.mutation<
      { orderId: string; total: number },
      OrderRequest
    >({
      query: (payload) => ({
        url: "/orders/checkout",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Order", "Cart"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(cartApi.util.invalidateTags(["Cart"]));
      },
    }),
    getMyOrders: builder.query<Order[], void>({
      query: () => "/orders/my",
      providesTags: ["Order"],
    }),
  }),
});

export const { useCheckoutMutation, useGetMyOrdersQuery } = orderApi;
