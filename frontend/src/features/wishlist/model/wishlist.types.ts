import type { Book } from "../../../entities/Book/model/types";

export type WishlistResponse = {
  wishlistId: string;
  items: Book[];
};
