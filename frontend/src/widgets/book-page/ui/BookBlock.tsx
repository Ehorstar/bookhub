import type { Book } from "../../../entities/Book/model/types";
import CartButton from "../../../features/cart/ui/CartButton";
import NotInStock from "../../../features/cart/ui/NotInStock";
import AddToWishlistButton from "../../../features/wishlist";
import InStock from "../../../shared/ui/InStock/InStock";
import styles from "./BookBlock.module.css";

type BookBlockProps = {
  book: Book;
};

export default function BookBlock({ book }: BookBlockProps) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
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
        {book.inStock ? (
          <div className={styles.cartButton}>
            <CartButton book={book} />
          </div>
        ) : (
          <div
            className={`${styles.stock} ${styles.notInStock} ${styles.cartButton}`}
          >
            <NotInStock />
          </div>
        )}

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
