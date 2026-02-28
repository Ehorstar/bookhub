import BookRow from "../../../widgets/book-row";
import HeroSlider from "../../../widgets/hero-slider";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <>
      <div className={styles.content}>
        <HeroSlider />
        <div className={styles.bookRows}>
          <BookRow genre="Детектив" />
          <BookRow genre="Фентезі" />
          <BookRow genre="Горор" />
          <BookRow genre="Фантастика" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
