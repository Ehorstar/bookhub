import styles from "./CartPhysicalTab.module.css";
import logo from "../../../assets/ImagesMenu/empty-cart.svg";
import { useGetCartQuery } from "../../../features/cart/api/cart.api";
import CartItem from "./CartItem";
import CartTotalBar from "./CartTotalBar";

function CartPhysicalTab() {
  const { data, isLoading: loading } = useGetCartQuery();
  const cart = data?.items;

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

  return (
    <div className={styles.layout}>
      <div className={styles.cartItems}>
        {cart.items.map((it) => (
          <div className={styles.cartItem}>
            <CartItem item={it.book} quantity={it.quantity} />
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
