import { useGetAllBooksQuery } from "../../../entities/Book/api/api";
import BookRow from "../../../widgets/book-row";
import HeroSlider from "../../../widgets/hero-slider";
import styles from "./HomePage.module.css";

function HomePage() {
  const { data = [], isLoading, error } = useGetAllBooksQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading books</p>;
  
  return (
    <>
      <div className={styles.content}>
        <HeroSlider />
        <div className={styles.bookRows}>
          <BookRow genre="Детектив" books={data} />
          <BookRow genre="Фентезі" books={data} />
          <BookRow genre="Горор" books={data} />
          <BookRow genre="Фантастика" books={data} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
