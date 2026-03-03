import { useNavigate } from "react-router-dom";
import logo from "../../../assets/ImagesCheckout/empty-checkout.webp";
import styles from "./CheckoutEmpty.module.css";

function CheckoutEmpty() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.empty}>
      <div className={styles.logo}>
        <img src={logo} alt="Порожній кошик" />
      </div>

      <div className={styles.textContainer}>
        <p className={styles.text}>
          Для того, щоб продовжити оформлення замовлення вам необхідно додати товари в кошик.
        </p>
        <button className={styles.primaryBtn} onClick={handleNavigateHome}>
          На головну
        </button>
      </div>
    </div>
  );
}

export default CheckoutEmpty;
