import type { Book } from "../../../entities/Book/model/types";

export type CartItem = {
  book: Book;
  quantity: number;
  total: number;
};

export type Cart = {
  cartId: string;
  items: CartItem[];
  total: number;
};

export type CartResponse = {
  message: string;
  items: Cart;
};

export type AddCartItemRequest = {
  bookId: string;
  quantity: number;
  price: number;
};
