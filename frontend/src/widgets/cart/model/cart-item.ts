import type { Book } from "../../../entities/Book/model/types";

export type CartItemProps = {
  item: Book;
  quantity: number;
  removeItem: () => void;
  incItemQty: () => void;
  decItemQty: () => void;
  isUpdating: boolean;
};
