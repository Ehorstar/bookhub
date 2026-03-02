import type { Cart } from "../../../features/cart/model/cart.types";
import CartItem from "../../cart/ui/CartItem";
import styles from "./CheckoutOrder.module.css";

type CheckoutOrder = {
  cart?: Cart;
};

function CheckoutOrder({ cart }: CheckoutOrder) {
  const items = cart?.items ?? [];
  const itemsCount = items.length;

  return (
    <section className={styles.cartItems}>
      <header className={styles.title}>
        <h1>Мій кошик {itemsCount === 0 ? "" : `(${itemsCount})`}</h1>
      </header>

      {items.map((item) => (
        <div key={item.book.id} className={styles.cartItem}>
          <CartItem item={item.book} quantity={item.quantity} />
        </div>
      ))}
    </section>
  );
}

export default CheckoutOrder;
