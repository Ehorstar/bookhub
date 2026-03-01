import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./Arrow.module.css";
import { useNavigate } from "react-router-dom";

type ArrowProps = {
  text: string;
  className?: string;
  to: string;
};

function Arrow({ text, className, to }: ArrowProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.seeMore} ${className ?? ""}`}
      onClick={() => navigate(to)}
    >
      <span className={styles.text}>{text}</span>

      <span className={styles.arrow}>
        <span className={styles.line}></span>
        <ArrowRightOutlined className={styles.icon} />
      </span>
    </div>
  );
}

export default Arrow;
