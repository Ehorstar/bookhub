import Arrow from "../../../shared/ui/Arrow/Arrow";
import styles from "./CartTotalBar.module.css";

type ToolbarProps = { total: number };

function CartTotalBar({ total }: ToolbarProps) {
  return (
    <div className={`${styles.totalRow} ${styles.all}`}>
      <div className={styles.totalLeft}>
        <span className={styles.text}>Разом:</span>
        <p className={styles.price}>{total}</p>
        <span className={styles.text}>ETH</span>
      </div>

      <div className={styles.totalRight}>
        <Arrow text="Продовжити" className={styles.Arrow} />
      </div>
    </div>
  );
}

export default CartTotalBar;
