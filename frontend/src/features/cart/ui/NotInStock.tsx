import Tippy from "@tippyjs/react";
import styles from "./NotInStock.module.css";
import { ClockCircleOutlined } from "@ant-design/icons";

function NotInStock() {
  return (
    <Tippy
      content="Незабаром у продажу"
      delay={[100, 100]}
      theme="menu"
      placement="bottom"
    >
      <button className={styles.button}>
        <ClockCircleOutlined className={styles.icon} />
      </button>
    </Tippy>
  );
}

export default NotInStock;
