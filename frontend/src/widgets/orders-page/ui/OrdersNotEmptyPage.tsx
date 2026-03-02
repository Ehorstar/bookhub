import type { Order } from "../../../entities/Order/model/types";
import styles from "./OrdersNotEmpty.module.css";

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("uk-UA");

type OrdersNotEmptyPageProps = {
  orders: Order[];
};

function OrdersNotEmptyPage({ orders }: OrdersNotEmptyPageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={`${styles.row} ${styles.head}`}>
          <div className={styles.cell}>Номер замовлення</div>
          <div className={styles.cellBorder}>Товари</div>
          <div className={styles.cellBorder}>Статус</div>
          <div className={styles.cellBorder}>Дата замовлення</div>
          <div className={styles.cellBorder}>Сума (ETH)</div>
        </div>

        {orders?.map((order) => {
          const s = (order.status || "").toLowerCase();
          const badgeClass = s.includes("cancel")
            ? styles.badgeGray
            : s.includes("complete")
              ? styles.badgeGreen
              : styles.badgeGray;

          const covers = order.items?.slice(0, 5) ?? [];

          return (
            <div key={order.id} className={styles.row}>
              <div className={styles.cell}>
                <span className={styles.orderNumber}>{order.id}</span>
              </div>

              <div className={styles.cell}>
                <div className={styles.covers}>
                  {covers.map((it) => (
                    <div className={styles.cover} key={it.bookId}>
                      <img
                        src={it.cover}
                        alt={it.title ?? "Book"}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.cell}>
                <span className={`${styles.badge} ${badgeClass}`}>
                  {order.status}
                </span>
              </div>

              <div className={styles.cell}>{formatDate(order.createdAt)}</div>

              <div className={styles.cell}>
                <span className={styles.totalValue}>{order.total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrdersNotEmptyPage;
