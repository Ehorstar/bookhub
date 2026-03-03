import { useEffect, useRef, useState } from "react";
import styles from "./Menu.module.css";
import {
  LogoutOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useUiState } from "../model/modal-state.store";
import {
  useGetStatusQuery,
  useIsAdminQuery,
  useLogoutMutation,
} from "../../../features/auth/api/auth.api";
import { useNavigate } from "react-router-dom";

function Menu() {
  const [show, setShow] = useState(false);
  const { open } = useUiState();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [logout] = useLogoutMutation();
  const { data } = useGetStatusQuery();
  const navigate = useNavigate();
  const isAuth = data?.isAuthenticated;

  const { data: isAdmin } = useIsAdminQuery();

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
      {isAuth ? (
        <div className={styles.content} onClick={() => setShow(!show)}>
          <UserOutlined className={styles.icon} />
          <p className={styles.text}>Вітаємо {data?.username}!</p>
          <UpOutlined
            className={`${styles.iconArrow} ${show ? styles.rotate : ""}`}
          />
        </div>
      ) : (
        <div className={styles.content} onClick={() => open("login")}>
          <UserOutlined className={styles.icon} />
          <p className={styles.text}>Авторизуватись</p>
        </div>
      )}

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

        <button
          className={styles.item}
          type="button"
          onClick={() => {
            (navigate("/orders"), setShow(false));
          }}
        >
          <ShoppingOutlined className={styles.itemIcon} />
          <span className={styles.itemText}>Мої замовлення</span>
        </button>

        {isAdmin && (
          <button
            className={styles.item}
            type="button"
            onClick={() => {
              (navigate("/admin"), setShow(false));
            }}
          >
            <SafetyCertificateOutlined className={styles.itemIcon} />
            <span className={styles.itemText}>Адмін</span>
          </button>
        )}

        <button
          className={`${styles.item} ${styles.danger}`}
          type="button"
          onClick={() => {
            logout();
            setShow(false);
          }}
        >
          <LogoutOutlined className={styles.itemIcon} />
          <span className={styles.itemText}>Вийти з аккаунту</span>
        </button>
      </div>
    </div>
  );
}

export default Menu;
