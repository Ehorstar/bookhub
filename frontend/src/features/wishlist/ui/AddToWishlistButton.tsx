import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import styles from "./AddToWishlistButton.module.css";
import Tippy from "@tippyjs/react";
import {
  useGetWishlistQuery,
  useToggleWishlistMutation,
} from "../api/wishlist.api";

type WishlistButtonProps = {
  className?: string;
  bookId: string;
};

function AddToWishlistButton({ className, bookId }: WishlistButtonProps) {
  const { data } = useGetWishlistQuery();
  const books = data?.items ?? [];
  const [toggleWishlist] = useToggleWishlistMutation();

  const isFavourite = books.some((book) => book.id === bookId);

  return (
    <button
      className={`${styles.button} ${className ?? ""}`}
      onClick={() => toggleWishlist({ bookId })}
    >
      {isFavourite ? (
        <Tippy
          content="В улюблених"
          delay={[100, 100]}
          theme="menu"
          placement="bottom"
        >
          <HeartFilled className={styles.icon} />
        </Tippy>
      ) : (
        <Tippy
          content="В улюблені"
          delay={[100, 100]}
          theme="menu"
          placement="bottom"
        >
          <HeartOutlined className={styles.icon} />
        </Tippy>
      )}
    </button>
  );
}

export default AddToWishlistButton;
