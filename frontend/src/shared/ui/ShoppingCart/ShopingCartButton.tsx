import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./ShoppingCartButton.module.css";
import Tippy from "@tippyjs/react";
import { useGetCartQuery } from "../../../features/cart/api/cart.api";

function ShoppingCartButton() {
  const { data } = useGetCartQuery();
  const cart = data?.items;

  const count = cart?.items.length || 0;

  return (
    <Tippy content="Кошик" delay={[100, 100]} theme="menu">
      <div>
        <ShoppingCartOutlined className={styles.icon} />
        {count > 0 && <span className={styles.countBadge}>{count}</span>}
      </div>
    </Tippy>
  );
}

export default ShoppingCartButton;
