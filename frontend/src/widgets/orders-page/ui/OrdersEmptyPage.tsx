import logo from "../../../assets/ImagesCheckout/no-orders.svg";
import styles from "./OrdersEmptyPage.module.css";

function OrdersEmptyPage() {
  return (
    <div className={styles.empty}>
      <div className={styles.logo}>
        <img src={logo} alt="Порожній кошик" />
      </div>

      <div className={styles.textContainer}>
        <p className={styles.text}>У вас ще немає замовлень</p>
      </div>
    </div>
  );
}

export default OrdersEmptyPage;
