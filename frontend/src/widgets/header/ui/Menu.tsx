import { useEffect, useRef, useState } from "react";
import styles from "./Menu.module.css";
import {
  BookOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useUiState } from "../model/modal-state";

function Menu() {
  const [show, setShow] = useState(false);
  const { open } = useUiState();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className={styles.main}>
      <div className={styles.content} onClick={() => setShow(!show)}>
        <UserOutlined className={styles.icon} />
        <p className={styles.text}>Вітаємо!</p>
        <UpOutlined
          className={`${styles.iconArrow} ${show ? styles.rotate : ""}`}
        />
      </div>

      <div className={`${styles.dropDown} ${show ? styles.open : ""}`}>
        <button
          className={styles.item}
          type="button"
          onClick={() => {
            setShow(false);
            open("profile");
          }}
        >
          <UserOutlined className={styles.itemIcon} />
          <span className={styles.itemText}>Профіль</span>
        </button>

        <button className={styles.item} type="button">
          <ShoppingOutlined className={styles.itemIcon} />
          <span className={styles.itemText}>Мої замовлення</span>
        </button>

        <button className={styles.item} type="button">
          <BookOutlined className={styles.itemIcon} />
          <span className={styles.itemText}>Бібліотека</span>
        </button>

        <button className={`${styles.item} ${styles.danger}`} type="button">
          <LogoutOutlined className={styles.itemIcon} />
          <span className={styles.itemText}>Вийти з аккаунту</span>
        </button>
      </div>
    </div>
  );
}

export default Menu;
