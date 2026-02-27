import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WishlistResponse } from "../model/wishlist.types";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api", credentials: "include" }),
  tagTypes: ["Wishlist"],
  endpoints: (build) => ({
    getWishlist: build.query<WishlistResponse, void>({
      query: () => "/wishlist",
      providesTags: ["Wishlist"],
    }),
    toggleWishlist: build.mutation<WishlistResponse, { bookId: string }>({
      query: ({ bookId }) => ({
        url: "/wishlist/toggle",
        method: "POST",
        body: { bookId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const { useGetWishlistQuery, useToggleWishlistMutation } = wishlistApi;
