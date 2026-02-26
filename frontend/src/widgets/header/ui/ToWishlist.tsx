import Tippy from "@tippyjs/react";
import styles from "./ToWishlist.module.css";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

function ToWishlist() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.cart} onClick={() => navigate("/wishlist")}>
      <Tippy content="Улюблені" delay={[100, 100]} theme="menu">
        {location.pathname !== "/wishlist" ? (
          <HeartOutlined className={styles.icon} />
        ) : (
          <HeartFilled className={styles.iconActive} />
        )}
      </Tippy>
    </div>
  );
}

export default ToWishlist;
