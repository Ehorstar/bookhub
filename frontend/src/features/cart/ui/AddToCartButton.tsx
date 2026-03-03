import Tippy from "@tippyjs/react";
import styles from "./AddToCartButton.module.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAddItemMutation } from "../api/cart.api";

function AddToCartButton({ bookId, price }: { bookId: string; price: number }) {
  const [addToCart] = useAddItemMutation();

  const clickHandler = async () => {
    try {
      await addToCart({ bookId, quantity: 1, price }).unwrap();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Tippy
      content="До кошику"
      delay={[100, 100]}
      theme="menu"
      placement="bottom"
    >
      <button className={styles.button} onClick={() => clickHandler()}>
        <ShoppingCartOutlined className={styles.icon} />
      </button>
    </Tippy>
  );
}

export default AddToCartButton;
