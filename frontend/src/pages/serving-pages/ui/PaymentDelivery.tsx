import styles from "./PaymentDelivery.module.css";
import logo from "../../../assets/ImagesServing/payment-delivery.png";
import Breadcrumbs from "../../../shared/ui/Breadcrumbs/Breadcrumbs";
function PaymentDelivery() {
  return (
    <section className={styles.section}>
      <Breadcrumbs
        items={[
          { label: "Головна", to: "/" },
          { label: `${"Оплата та доставка"}` },
        ]}
      />
      <div className="container">
        <div className={styles.card}>
          <div className={styles.top}>
            <img className={styles.image} src={logo} alt="" />
          </div>

          <div className={styles.bottom}>
            <h2 className={styles.title}>Оплата та доставка</h2>

            <p className={styles.text}>
              У BookHub ми зробили процес замовлення максимально простим та
              сучасним. Оплата здійснюється виключно у криптовалюті Ethereum
              (ETH) — швидко, безпечно та без зайвих посередників.
            </p>

            <p className={styles.text}>
              Після оформлення замовлення ти отримуєш реквізити для переказу
              ETH. Підтвердження платежу відбувається після обробки транзакції в
              мережі, після чого ми одразу готуємо твоє замовлення до відправки.
            </p>

            <p className={styles.text}>
              Доставка здійснюється по всій Україні службою «Нова Пошта». Термін
              доставки зазвичай складає 1–3 дні залежно від міста. Після
              відправлення ти отримуєш номер накладної для відстеження посилки.
            </p>

            <p className={styles.text}>
              Наша мета — зробити покупку книг сучасною, зручною та прозорою:
              криптооплата без банківських обмежень та швидка доставка по
              Україні.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentDelivery;
