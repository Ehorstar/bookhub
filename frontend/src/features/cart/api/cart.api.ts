import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CartItem, CartResponse } from "../model/cart.types";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:55026/api",
    credentials: "include",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    addItem: builder.mutation<void, CartItem>({
      query: (item) => ({
        url: "/cart/items",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Cart"],
    }),

    setItemQty: builder.mutation<void, { bookId: string; qty: number }>({
      query: ({ bookId, qty }) => ({
        url: `/cart/items/${bookId}/qty/${qty}`,
        method: "PUT",
      }),
      invalidatesTags: ["Cart"],
    }),

    removeItem: builder.mutation<void, string>({
      query: (bookId) => ({
        url: `/cart/items/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddItemMutation,
  useSetItemQtyMutation,
  useRemoveItemMutation,
} = cartApi;
