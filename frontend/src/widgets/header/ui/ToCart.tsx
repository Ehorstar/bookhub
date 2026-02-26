import styles from "./ToWishlist.module.css";
import { useNavigate } from "react-router-dom";
import ShoppingCartButton from "../../../shared/ui/ShoppingCart/ShopingCart";

function ToCart() {
  const navigate = useNavigate();

  return (
    <div className={styles.cart} onClick={() => navigate("/cart")}>
      <ShoppingCartButton />
    </div>
  );
}

export default ToCart;
