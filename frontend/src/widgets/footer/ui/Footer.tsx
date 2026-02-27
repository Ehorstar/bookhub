import styles from "./Footer.module.css";
import { PhoneOutlined } from "@ant-design/icons";
import paymentLogo from "../../../assets/ImagesFooter/payment.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.rowsUp}>
          <div className={styles.row}>
            <nav className={styles.links}>
              <a className={`${styles.mainLink} ${"link"}`} href="#">
                Про BookHub
              </a>

              <a className={`${styles.mainLink} ${"link"}`} href="#">
                Є питання?
              </a>

              <a className={"link"} href="#">
                Способи оплати та доставки
              </a>

              <a className={"link"} href="#">
                Умови користування
              </a>

              <div className={styles.info}>
                <PhoneOutlined className={styles.icon} />
                <a
                  className={"link"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("0 (96) 292 00 99");
                  }}
                >
                  0 (96) 292 00 99
                </a>
              </div>
            </nav>
          </div>
        </div>
        <div className={"devider"} />
        <div className={styles.rowsDown}>
          <p>© 2026 «BookHub»</p>

          <img src={paymentLogo} alt="" className={styles.paymentLogo} />

          <p>Powered By Egor</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
