import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AdminBookListItem {
  id: string;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  stockCount: number;
  coverImage: string;
  categories: string[];
  slug: string;
}

export interface AdminBookUpdate {
  title: string;
  author: string;
  description: string;
  price: number;
  oldPrice?: number;
  stockCount: number;
  coverImage: string;
  images: string[];
  categories: string[];
  language: string;
  publisher: string;
  year: number;
  pages: number;
  binding: string;
  slug: string;
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["Admin"],
  endpoints: (build) => ({
    getAdminBooks: build.query<AdminBookListItem[], void>({
      query: () => "admin/books",
      providesTags: ["Admin"],
    }),
    addAdminBook: build.mutation<any, AdminBookUpdate>({
      query: (body) => ({
        url: "admin/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),

    updateAdminBook: build.mutation<
      void,
      { id: string; body: AdminBookUpdate }
    >({
      query: ({ id, body }) => ({
        url: `admin/books/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteAdminBook: build.mutation<void, string>({
      query: (id) => ({
        url: `admin/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAdminBooksQuery,
  useAddAdminBookMutation,
  useUpdateAdminBookMutation,
  useDeleteAdminBookMutation,
} = adminApi;
