export type CartItem = {
  bookId: string;
  quantity: number;
  price: number;
};

export type Cart = {
  id?: string;
  cartId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
};

export type CartResponse = {
  message: string;
  cart: Cart;
};
