import logo from "../../../assets/ImagesCheckout/to-registration.webp";
import { useUiState } from "../../header/model/modal-state.store";
import styles from "./CheckoutEmpty.module.css";

type CheckoutNotAuthProps = {
  isAuth?: boolean;
};

function CheckoutNotAuth({ isAuth }: CheckoutNotAuthProps) {
  const { open } = useUiState();

  if (isAuth) {
    return null;
  }

  return (
    <div className={styles.empty}>
      <img src={logo} alt="Потрібна авторизація" />
      <p className={styles.text}>
        Для того, щоб продовжити оформлення замовлення вам необхідно авторизуватись.
      </p>
      <button className={styles.primaryBtn} onClick={() => open("login")}>
        Авторизуватись
      </button>
    </div>
  );
}

export default CheckoutNotAuth;
