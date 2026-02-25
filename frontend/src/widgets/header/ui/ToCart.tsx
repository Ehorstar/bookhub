import styles from "./ToWishlist.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import ShoppingCartButton from "../../../shared/ui/ShoppingCart/ShopingCart";

function ToCart() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.cart} onClick={() => navigate("/cart")}>
      <ShoppingCartButton />
    </div>
  );
}

export default ToCart;
