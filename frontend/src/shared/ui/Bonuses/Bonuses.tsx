import styles from "./Bonuses.module.css";
import logo from "../../../assets/ImagesHeader/logo-bonuses.png";
import Pluralize from "../Pluralize/Pluralize";

type BonusesProps = {
  count: number;
};

export default function Bonuses({ count }: BonusesProps) {
  return (
    <div className={styles.bonuses}>
      <img src={logo} alt="logo" className={styles.logo} />
      {"+"}
      <Pluralize count={count} one="бонус" few="бонуси" many="бонусів" />
    </div>
  );
}
