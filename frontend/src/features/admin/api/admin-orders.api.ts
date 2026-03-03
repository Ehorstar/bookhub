import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { OrderItem } from "../../../entities/Order/model/types";

export interface AdminOrderDto {
  id: string;
  userId: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export type UpdateOrderStatusDto = {
  status: string;
};

export const adminOrdersApi = createApi({
  reducerPath: "adminOrdersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["AdminOrders"],
  endpoints: (build) => ({
    getAdminOrders: build.query<AdminOrderDto[], void>({
      query: () => "admin/orders",
      providesTags: ["AdminOrders"],
    }),
    deleteAdminOrder: build.mutation<void, string>({
      query: (id) => ({
        url: `admin/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminOrders"],
    }),
    updateAdminOrder: build.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `admin/orders/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["AdminOrders"],
    }),
  }),
});

export const {
  useGetAdminOrdersQuery,
  useDeleteAdminOrderMutation,
  useUpdateAdminOrderMutation,
} = adminOrdersApi;
