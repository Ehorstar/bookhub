import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./ShoppingCart.module.css";
// import { useGetCartsQuery } from "../../../features/cart/api/carts.api";
import Tippy from "@tippyjs/react";

function ShoppingCartButton() {
  //   const { data: cart } = useGetCartsQuery();

  const count = 5;

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
