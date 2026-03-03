import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AdminUserDto {
  id: string;
  email: string;
  roles: string[];
}

export const adminUsersApi = createApi({
  reducerPath: "adminUsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["AdminUsers"],
  endpoints: (build) => ({
    getAdminUsers: build.query<AdminUserDto[], void>({
      query: () => "admin/users",
      providesTags: ["AdminUsers"],
    }),

    deleteAdminUser: build.mutation<void, string>({
      query: (id) => ({
        url: `admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminUsers"],
    }),
  }),
});

export const { useGetAdminUsersQuery, useDeleteAdminUserMutation } =
  adminUsersApi;
