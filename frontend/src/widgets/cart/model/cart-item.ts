import type { Book } from "../../../entities/Book/model/types";

export type CartItemProps = {
  item: Book;
  quantity: number;
};
