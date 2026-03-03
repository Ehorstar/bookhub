import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../entities/Book/api/api";
import { cartApi } from "../features/cart/api/cart.api";
import { wishlistApi } from "../features/wishlist/api/wishlist.api";
import { authApi } from "../features/auth/api/auth.api";
import { orderApi } from "../features/order/api/order.api";
import { adminApi } from "../features/admin/api/admin-books.api";
import { adminUsersApi } from "../features/admin/api/admin-users.api";
import { adminOrdersApi } from "../features/admin/api/admin-orders.api";

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [adminUsersApi.reducerPath]: adminUsersApi.reducer,
    [adminOrdersApi.reducerPath]: adminOrdersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      booksApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware,
      authApi.middleware,
      orderApi.middleware,
      adminApi.middleware,
      adminUsersApi.middleware,
      adminOrdersApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
