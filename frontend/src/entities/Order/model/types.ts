export type OrderItem = {
  bookId: string;
  title: string;
  cover: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
};

export type OrderRequest = {
  city: string;
  department: string;
  phone: string;
  firstName: string;
  lastName: string;
};
