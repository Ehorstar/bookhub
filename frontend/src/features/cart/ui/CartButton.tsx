import type { Book } from "../../../entities/Book/model/types";
import { useGetCartQuery } from "../api/cart.api";
import AddToCartButton from "./AddToCartButton";
import InCartButton from "./InCartButton";

type CartButtonProps = {
  book: Book;
};

function CartButton({ book }: CartButtonProps) {
  const { data } = useGetCartQuery();
  const cart = data?.items;
  return (
    <div>
      {cart?.items.find((item) => item.book.id === book.id) ? (
        <InCartButton />
      ) : (
        <AddToCartButton bookId={book.id} price={book.price} />
      )}
    </div>
  );
}

export default CartButton;
