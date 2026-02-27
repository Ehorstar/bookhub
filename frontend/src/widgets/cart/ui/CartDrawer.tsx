import styles from "./CartDrawer.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { useUiState } from "../../header/model/modal-state";
import ShoppingCartButton from "../../../shared/ui/ShoppingCart/ShopingCart";
import CartPhysicalTab from "./CartPhysicalTab";

function CartDrawer() {
  const { isOpen, toggle, close } = useUiState();
  const show = isOpen("cart");
  return (
    <div className={styles.main}>
      <div className={styles.cartButton} onClick={() => toggle("cart")}>
        <ShoppingCartButton />
      </div>

      <div
        className={`${styles.overlay} ${show ? styles.overlayOpen : ""}`}
        onClick={() => close("cart")}
      />

      <div className={`${styles.cartList} ${show ? styles.cartListOpen : ""}`}>
        <div className={styles.title}>
          <CloseOutlined
            onClick={() => close("cart")}
            className={styles.icon}
          />
          <p>Кошик</p>
        </div>
        <CartPhysicalTab />
      </div>
    </div>
  );
}

export default CartDrawer;
