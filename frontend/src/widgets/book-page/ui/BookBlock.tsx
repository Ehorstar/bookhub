import type { Book } from "../../../entities/Book/model/types";
import CartButton from "../../../features/cart/ui/CartButton";
import AddToWishlistButton from "../../../features/wishlist";
import Bonuses from "../../../shared/ui/Bonuses/Bonuses";
import InStock from "../../../shared/ui/InStock/InStock";
import styles from "./BookBlock.module.css";

type BookBlockProps = {
  book: Book;
};

export default function BookBlock({ book }: BookBlockProps) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Bonuses count={(book.price * 0.02)} />
        <InStock inStock={book.inStock} />
      </div>

      <div className={styles.priceBlock}>
        <p className={styles.title}>Ціна у BookHub: </p>
        <div className={styles.prices}>
          <p className={styles.price}>{book.price} ETH</p>
          {book.oldPrice ? (
            <p className={styles.oldPrice}>{book.oldPrice} ETH</p>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className={styles.buttons}>
        <div className={styles.cartButton}>
          <CartButton book={book} />
        </div>

        <AddToWishlistButton
          bookId={book.id}
          className={styles.wishlistButton}
        />
      </div>

      <div className="devider" />
      <div className={styles.paymentBlock}>
        <h2 className={styles.title}>Оплата</h2>
        <p className={styles.text}>Онлайн-оплата через криптовалюту</p>
      </div>
    </div>
  );
}
