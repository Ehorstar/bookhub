import BookCard from "../../../entities/Book";
import { useGetWishlistQuery } from "../../../features/wishlist/api/wishlist.api";
import styles from "./WishlistList.module.css";

function WishlistList() {
  const { data: wishlist } = useGetWishlistQuery();
  return (
    <div className={styles.wishlist}>
      {wishlist?.items.map((item) => {
        return <BookCard key={item.id} book={item} />;
      })}
    </div>
  );
}

export default WishlistList;
