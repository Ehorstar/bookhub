import { CloseOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import Tippy from "@tippyjs/react";
import styles from "./Auth.module.css";
import { useLoginMutation } from "../../../features/auth/api/auth.api";
import { useUiState } from "../../../widgets/header/model/modal-state.store";
function Login() {
  const { isOpen, close, open } = useUiState();
  const show = isOpen("login");

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Заповніть email та пароль");
      return;
    }

    try {
      await login({ email, password }).unwrap();
      close("login");
    } catch (err: any) {
      const msg =
        (typeof err?.data === "string" ? err.data : null) ||
        err?.data?.message ||
        err?.error ||
        "Помилка входу";
      setError(msg);
    }
  };

  return (
    <div className={styles.main}>
      <div
        className={`${styles.overlay} ${show ? styles.overlayOpen : ""}`}
        onClick={() => close("login")}
      />

      <div className={`${styles.modal} ${show ? styles.modalOpen : ""}`}>
        <div className={styles.header}>
          <CloseOutlined
            onClick={() => close("login")}
            className={styles.iconExit}
          />
          <p>Вхід</p>
        </div>

        <div className={"devider"} />

        <form className={styles.container} onSubmit={onSubmit}>
          <h1 className={styles.title}>Увійти в аккаунт</h1>
          <div className={styles.card}>
            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <MailOutlined />
              </div>

              <div className={styles.info}>
                <p className={styles.label}>Email</p>
                <input
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={"devider"} />

            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <LockOutlined />
              </div>

              <div className={styles.info}>
                <p className={styles.label}>Пароль</p>
                <input
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            className={styles.primaryBtn}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Вхід..." : "Увійти"}
          </button>

          <div className={styles.footerRow}>
            <p className={styles.footerText}>Немає акаунту?</p>
            <Tippy content="Реєстрація" delay={[100, 100]} theme="menu">
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => {
                  close("login");
                  open("register");
                }}
              >
                Зареєструватись
              </button>
            </Tippy>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
