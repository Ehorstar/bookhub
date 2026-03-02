import { StarFilled } from "@ant-design/icons";
import styles from "./BookCard.module.css";
import type { Book } from "../model/types";
import Pluralize from "../../../shared/ui/Pluralize/Pluralize";
import AddToWishlist from "../../../features/wishlist/ui/AddToWishlistButton";
import { useNavigate } from "react-router-dom";
import CartButton from "../../../features/cart/ui/CartButton";
import NotInStock from "../../../features/cart/ui/NotInStock";

function BookCard({ book }: { book: Book }) {
  const navigate = useNavigate();
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className={styles.bookCard}
      onClick={() => navigate(`/book/${book.slug}`)}
    >
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

            <div onClick={stop}>
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

              <AddToWishlist
                bookId={book.id}
                className={styles.wishlistButton}
              />
            </div>

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
            <p className="oldPrice">{book.oldPrice} ETH</p>
          ) : (
            <p className="oldPriceHidden">None</p>
          )}
          <p className="price">{book.price} ETH</p>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
