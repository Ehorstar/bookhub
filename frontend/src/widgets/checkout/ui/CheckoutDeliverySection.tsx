import logo from "../../../assets/ImagesHeader/logo-delivery.png";
import styles from "./CheckoutDelivery.module.css";

type Props = {
  city: string;
  department: string;
  freeDelivery: boolean;
  leftToFree: number;
  onCityChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
};

function CheckoutDeliverySection({
  city,
  department,
  freeDelivery,
  leftToFree,
  onCityChange,
  onDepartmentChange,
}: Props) {
  return (
    <section className={styles.deliverySection}>
      <h2 className={styles.sectionTitle}>Доставка</h2>

      <div className={`${styles.deliveryBanner} ${freeDelivery ? styles.freeDelivery : ""}`}>
        <img className={styles.deliveryLogo} src={logo} alt="Nova Poshta" />
        <div className={styles.deliveryText}>
          <h3>Безкоштовна доставка від 30 ETH</h3>
          {freeDelivery ? (
            <p>Доставка безкоштовна</p>
          ) : (
            <p>Для безкоштовної доставки потрібно докупити товару на суму {leftToFree} ETH</p>
          )}
        </div>
      </div>

      <div className={styles.card}>
        <input
          className={styles.input}
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          placeholder="Населений пункт"
        />

        <input
          className={styles.input}
          value={department}
          onChange={(event) => onDepartmentChange(event.target.value)}
          placeholder="Відділення нової пошти"
        />
      </div>
    </section>
  );
}

export default CheckoutDeliverySection;
