import Tippy from "@tippyjs/react";
import styles from "./InCartButton.module.css";
import { CheckOutlined } from "@ant-design/icons";
function InCartButton() {
  return (
    <Tippy
      content="У кошику"
      delay={[100, 100]}
      theme="menu"
      placement="bottom"
    >
      <button className={styles.button}>
        <CheckOutlined className={styles.icon} />
      </button>
    </Tippy>
  );
}

export default InCartButton;
