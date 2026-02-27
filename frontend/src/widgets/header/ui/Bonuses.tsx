import { useState } from "react";
import styles from "./Bonuses.module.css";
import logo from "../../../assets/ImagesHeader/logo-bonuses.png";

const Bonuses = () => {
  const [bonuses] = useState(189);

  return (
    <div className={styles.bonuses}>
      <div className={styles.bonusesIcon}>
        <img src={logo} alt="logo-bonuses" className={styles.icon} />
      </div>

      <p className={styles.title}>Бонуси: </p>
      <p className={styles.subtitle}>{bonuses} ETH</p>
    </div>
  );
};

export default Bonuses;
