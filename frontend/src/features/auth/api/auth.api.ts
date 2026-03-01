import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  StatusResponse,
  UpdateProfileRequest,
} from "../../../entities/Auth/model/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    updateProfile: builder.mutation<void, UpdateProfileRequest>({
      query: (body) => ({
        url: "/user/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    getStatus: builder.query<StatusResponse, void>({
      query: () => "/user/status",
      providesTags: ["Auth"],
    }),

    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetStatusQuery,
  useUpdateProfileMutation,
  useRegisterMutation,
} = authApi;
