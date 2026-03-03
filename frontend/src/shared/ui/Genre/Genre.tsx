import styles from "./Genre.module.css";

type GenreProps = {
  categories: string[];
};

function Genre({ categories }: GenreProps) {
  return (
    <div className={styles.genre}>
      {categories.map((genre) => (
        <div key={genre} className={styles.genreItem}>
          {genre}
        </div>
      ))}
    </div>
  );
}

export default Genre;
