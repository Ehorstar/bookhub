import { HeartOutlined } from "@ant-design/icons";
import styles from "./AddToWishlist.module.css";
import Tippy from "@tippyjs/react";

type FavouriteButtonProps = {
  className?: string;
};

function AddToWishlist({ className }: FavouriteButtonProps) {
  return (
    <Tippy
      content="В улюблені"
      delay={[100, 100]}
      theme="menu"
      placement="bottom"
    >
      <button className={`${styles.button} ${className ?? ""}`}>
        <HeartOutlined className={styles.icon} />
      </button>
    </Tippy>
  );
}

export default AddToWishlist;
