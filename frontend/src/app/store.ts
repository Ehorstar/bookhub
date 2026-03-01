import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../entities/Book/api/api";
import { cartApi } from "../features/cart/api/cart.api";
import { wishlistApi } from "../features/wishlist/api/wishlist.api";
import { authApi } from "../features/auth/api/auth.api";

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      booksApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware,
      authApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
