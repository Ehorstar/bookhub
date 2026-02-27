import Detective from "../../../widgets/book-rows/ui/Detective";
import Fantastic from "../../../widgets/book-rows/ui/Fantastic";
import Horror from "../../../widgets/book-rows/ui/Horror";
import HeroSlider from "../../../widgets/hero-slider/HeroSlider";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.content}>
      <HeroSlider />
      <Fantastic />
      <Horror />
      <Detective />
    </div>
  );
}

export default HomePage;
