import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./Arrow.module.css";

type ArrowProps = {
  text: string;
  className?: string;
};

function Arrow({ text, className }: ArrowProps) {
  return (
    <div className={`${styles.seeMore} ${className ?? ""}`}>
      <span className={styles.text}>{text}</span>

      <span className={styles.arrow}>
        <span className={styles.line}></span>
        <ArrowRightOutlined className={styles.icon} />
      </span>
    </div>
  );
}

export default Arrow;
