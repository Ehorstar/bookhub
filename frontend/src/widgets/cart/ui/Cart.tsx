import { useState } from "react";
import styles from "./CartPhysicalTab.module.css";
import logo from "../../../assets/ImagesMenu/empty-cart.svg";
import {
  useGetCartsQuery,
  useRemoveItemMutation,
  useSetItemQtyMutation,
} from "../../../features/cart/api/carts.api";
import CartItem from "./CartItem";
import CartTotalBar from "./CartTotalBar";

function CartPhysicalTab() {
  const { data: cart, isLoading: loading } = useGetCartsQuery();
  const [setItemQty] = useSetItemQtyMutation();
  const [removeItem] = useRemoveItemMutation();

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className={styles.empty}>
        <p className={styles.subTitle}>Завантаження...</p>
      </div>
    );
  }

  if (!cart?.items.length) {
    return (
      <div className={styles.empty}>
        <img src={logo} alt="" className={styles.logo} />
        <h2 className={styles.textTitle}>Тут поки що нічого не має</h2>
        <p className={styles.subTitle}>
          Перейдіть до каталогу, та оберіть потрібну вам книжку
        </p>
      </div>
    );
  }

  const setQty = async (bookId: string, qty: number) => {
    setUpdatingId(bookId);
    try {
      await setItemQty({ bookId, qty }).unwrap();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.cartItems}>
        {cart.items.map((it) => (
          <div className={styles.cartItem}>
            <CartItem
              key={it.book._id}
              item={it.book}
              quantity={it.quantity}
              disabled={updatingId === it.book._id}
              removeItem={() => removeItem(it.book._id)}
              incItemQty={() => setQty(it.book._id, it.quantity + 1)}
              decItemQty={() => setQty(it.book._id, it.quantity - 1)}
              isUpdating={updatingId === it.book._id}
            />
          </div>
        ))}
      </div>

      <div className={styles.totalBar}>
        <div className={"devider"} />
        <CartTotalBar total={cart.total} />
      </div>
    </div>
  );
}

export default CartPhysicalTab;
