import {
  CloseOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import styles from "./Auth.module.css";
import { useRegisterMutation } from "../../../features/auth/api/auth.api";
import { useUiState } from "../../../widgets/header/model/modal-state.store";

function Register() {
  const { isOpen, close, open } = useUiState();
  const show = isOpen("register");

  const [register, { isLoading }] = useRegisterMutation();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!userName.trim() || !email.trim() || !password.trim()) {
      setError("Заповніть всі поля");
      return;
    }

    if (password.length < 6) {
      setError("Пароль має бути мінімум 6 символів");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    const phoneRegex = /^0\d{9}$/;

    if (!phoneRegex.test(cleanPhone)) {
      setError("Введіть коректний номер (0XXXXXXXXX)");
      return;
    }

    try {
      await register({ userName, email, password, phone: cleanPhone }).unwrap();
      setSuccess("Акаунт створено. Тепер увійдіть.");
      setUserName("");
      setEmail("");
      setPassword("");
      setPhone("");
    } catch {
      setError("Помилка реєстрації");
    }
  };

  return (
    <div className={styles.main}>
      <div
        className={`${styles.overlay} ${show ? styles.overlayOpen : ""}`}
        onClick={() => close("register")}
      />

      <div className={`${styles.modal} ${show ? styles.modalOpen : ""}`}>
        <div className={styles.header}>
          <CloseOutlined
            onClick={() => close("register")}
            className={styles.iconExit}
          />
          <p>Реєстрація</p>
        </div>

        <div className="devider" />

        <form className={styles.container} onSubmit={onSubmit}>
          <h1 className={styles.title}>Зареєструвати аккаунт</h1>

          <div className={styles.card}>
            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <UserOutlined />
              </div>
              <div className={styles.info}>
                <p className={styles.label}>Ім`я користувача</p>
                <input
                  className={styles.input}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="John Doe"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="devider" />

            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <MailOutlined />
              </div>
              <div className={styles.info}>
                <p className={styles.label}>Email</p>
                <input
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="devider" />

            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <MailOutlined />
              </div>
              <div className={styles.info}>
                <p className={styles.label}>Номер телефону</p>
                <input
                  className={styles.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="096 000 00 00"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="devider" />

            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <LockOutlined />
              </div>
              <div className={styles.info}>
                <p className={styles.label}>Пароль</p>
                <input
                  className={styles.input}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Пароль"
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <button
            className={styles.primaryBtn}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Створення..." : "Зареєструватись"}
          </button>

          <div className={styles.footerRow}>
            <p className={styles.footerText}>Вже є акаунт?</p>

            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => {
                close("register");
                open("login");
              }}
            >
              Увійти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
