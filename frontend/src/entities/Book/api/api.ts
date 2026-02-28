import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book } from "../model/types";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Books"],
  endpoints: (build) => ({
    getAllBooks: build.query<Book[], void>({
      query: () => "books",
      providesTags: ["Books"],
    }),
    getBookById: build.query<Book, string>({
      query: (id) => `books/${id}`,
      providesTags: ["Books"],
    }),
    getBookBySlug: build.query<Book, string>({
      query: (slug) => `books/slug/${slug}`,
      providesTags: ["Books"],
    }),
    createBook: build.mutation<Book, Book>({
      query: (book) => ({
        url: "books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: build.mutation<Book, Book>({
      query: (book) => ({
        url: `books/${book.id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: build.mutation<string, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useGetBookBySlugQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
