import logo from "../../../assets/ImagesWishlist/empty-wishlist.svg";
import styles from "./WishlistEmpty.module.css";

function WishListEmpty() {
  return (
    <div className={styles.wishlistEmpty}>
      <img src={logo} alt="" className={styles.logo} />
      <p className={styles.emptyText}>Збережених книг поки немає</p>
    </div>
  );
}

export default WishListEmpty;
