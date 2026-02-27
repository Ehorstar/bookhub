import { useGetWishlistQuery } from "../../../features/wishlist/api/wishlist.api";
import Breadcrumbs from "../../../shared/ui/Breadcrumbs/Breadcrumbs";

import WishListEmpty from "../../../widgets/wishlist/ui/WishlistEmpty";
import WishlistList from "../../../widgets/wishlist/ui/WishlistList";
import styles from "./WishlistPage.module.css";

function WishlistPage() {
  const { data: wishlist } = useGetWishlistQuery();

  return (
    <div className="container">
      <div className={styles.header}>
        <Breadcrumbs
          items={[{ label: "Головна", to: "/" }, { label: "Список бажань" }]}
        />

        <h1 className={styles.title}>Список бажань</h1>
      </div>

      {wishlist?.items.length == 0 ? <WishListEmpty /> : <WishlistList />}
    </div>
  );
}

export default WishlistPage;
