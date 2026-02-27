import { StarFilled } from "@ant-design/icons";
import styles from "./BookCard.module.css";
import type { Book } from "../model/types";
import Pluralize from "../../../shared/ui/Pluralize/Pluralize";
import { useGetCartQuery } from "../../../features/cart/api/cart.api";
import AddToWishlist from "../../../features/wishlist";
import { AddToCartButton, InCartButton } from "../../../features/cart";

function BookCard({ book }: { book: Book }) {
  const { data, isLoading } = useGetCartQuery();
  const cart = data?.cart;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.bookCard}>
      <div className={styles.bookCover}>
        <img
          src={book.coverImage}
          alt={book.title}
          className={styles.img}
          loading="lazy"
        />
      </div>
      <div className={styles.bookInfo}>
        {book.rating > 0 ? (
          <div className={styles.rating}>
            <div className={styles.ratingValue}>
              <StarFilled className={styles.starActive} />
              <span className={styles.ratingNumber}>{book.rating}</span>
            </div>

            {cart?.items.find((item) => item.bookId === book.id) ? (
              <InCartButton />
            ) : (
              <AddToCartButton bookId={book.id} price={book.price} />
            )}

            <AddToWishlist />

            <div className={styles.reviewsCount}>
              <Pluralize
                count={book.reviewsCount}
                one="оцінка"
                few="оцінки"
                many="оцінок"
              />
            </div>
          </div>
        ) : (
          <div className={styles.rating}>
            <div className={styles.ratingValue}>
              <StarFilled className={styles.starNone} />
            </div>

            <div className={styles.reviewsCount}>
              {book.reviewsCount} оцінок
            </div>
          </div>
        )}

        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>

        <div className="prices">
          {book.oldPrice ? (
            <p className="oldPrice">{book.oldPrice} грн</p>
          ) : (
            <p className="oldPriceHidden">None</p>
          )}
          <p className="price">{book.price} грн</p>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
