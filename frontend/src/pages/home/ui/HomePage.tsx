import BookRow from "../../../widgets/book-row";
import HeroSlider from "../../../widgets/hero-slider";

import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.content}>
      <HeroSlider />
      <BookRow genre="Детектив" />
      <BookRow genre="Горор" />
      <BookRow genre="Фантастика" />
    </div>
  );
}

export default HomePage;
