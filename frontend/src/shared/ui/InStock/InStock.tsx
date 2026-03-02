import { CheckOutlined } from "@ant-design/icons";
import styles from "./InStock.module.css";

type InStockProps = {
  inStock: boolean;
};

export default function InStock({ inStock }: InStockProps) {
  return (
    <div className={styles.container}>
      {inStock ? (
        <div className={`${styles.stock} ${styles.inStock}`}>
          <CheckOutlined className={styles.icon} />
          <p>В наявності</p>
        </div>
      ) : (
       null
      )}
    </div>
  );
}
