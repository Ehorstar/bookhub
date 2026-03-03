import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import DeleteButton from "../../../shared/ui/DeleteButton/DeleteButton";
import Tippy from "@tippyjs/react";
import styles from "./CartItem.module.css";
import Genre from "../../../shared/ui/Genre/Genre";
import type { CartItemProps } from "../model/cart-item";
import AddToWishlistButton from "../../../features/wishlist/ui/AddToWishlistButton";
import { useNavigate } from "react-router-dom";
import {
  useRemoveItemMutation,
  useSetItemQtyMutation,
} from "../../../features/cart/api/cart.api";
import { useState } from "react";

function CartItem({ item: it, quantity }: CartItemProps) {
  const navigate = useNavigate();

  const [setItemQty] = useSetItemQtyMutation();
  const [removeItem] = useRemoveItemMutation();

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const setQty = async (bookId: string, qty: number) => {
    setUpdatingId(bookId);
    try {
      await setItemQty({ bookId, qty }).unwrap();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemInfo}>
        <div className={styles.itemUp}>
          <div className={styles.itemUpLeft}>
            <img
              src={it.coverImage}
              alt=""
              className={styles.coverImage}
              onClick={() => navigate(`book/${it.slug}`)}
            />
            <div className={styles.mainText}>
              <Genre categories={it.categories} />
              <div>
                <span className={styles.textTitle}>{it.title}</span>
                <p className={styles.subTitle}>{it.author}</p>
              </div>
            </div>
          </div>
          <div className={styles.itemUpRight} onClick={() => removeItem(it.id)}>
            <DeleteButton tippy={"Видалити"} />
          </div>
        </div>

        <div className="devider" />

        <div className={styles.itemDown}>
          <AddToWishlistButton className={styles.icon} bookId={it.id} />

          <div className={styles.quantity}>
            <Tippy
              content="Відняти"
              delay={[100, 100]}
              theme="menu"
              placement="bottom"
            >
              <div
                className={`${styles.quantityBtn} ${
                  quantity === 1 || updatingId ? styles.quantityBtnDisabled : ""
                } `}
                onClick={() => setQty(it.id, quantity - 1)}
              >
                <MinusOutlined />
              </div>
            </Tippy>

            <div className={styles.quantityValue}>{quantity}</div>

            <Tippy
              content="Додати"
              delay={[100, 100]}
              theme="menu"
              placement="bottom"
            >
              <div
                className={`${styles.quantityBtn} ${
                  updatingId ? styles.quantityBtnDisabled : ""
                } `}
                onClick={() => setQty(it.id, quantity + 1)}
              >
                <PlusOutlined />
              </div>
            </Tippy>
          </div>

          <div className={styles.pricesFixed}>
            <div className="prices">
              {it.oldPrice ? (
                <p className="oldPrice">{it.oldPrice * quantity} ETH</p>
              ) : (
                <p className="oldPriceHidden">None</p>
              )}
              <p className="price">{it.price * quantity} ETH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
