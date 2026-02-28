import styles from "./Delivery.module.css";
import logo from "../../../assets/ImagesHeader/logo-delivery.png";

const Delivery = () => {
  return (
    <div className={styles.delivery}>
      <div className={styles.deliveryIcon}>
        <img src={logo} alt="logo-delivery" className={styles.icon} />
      </div>

      <div className={styles.text}>
        <p className={styles.title}>Безкоштовна доставка</p>
        <p className={styles.subtitle}>від 30 ETH</p>
      </div>
    </div>
  );
};

export default Delivery;
