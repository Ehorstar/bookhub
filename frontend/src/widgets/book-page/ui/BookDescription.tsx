import type { Book } from "../../../entities/Book/model/types";
import styles from "./BookDescription.module.css";

type BookDescriptionProps = {
  book: Book;
};

function BookDescription({ book }: BookDescriptionProps) {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <h2 className={styles.title}>Опис</h2>
        <p className={styles.value}>{book.description}</p>
      </div>

      <div className={styles.info}>
        <h2 className={styles.title}>Характеристика</h2>

        <div className={styles.specRow}>
          <span className={styles.label}>Назва товару</span>
          <span className={styles.value}>{book.title}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.label}>Автор</span>
          <span className={styles.value}>{book.author}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.label}>Жанр</span>
          <span className={styles.value}>{book.categories[0]}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.label}>Мова</span>
          <span className={styles.value}>{book.language}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.label}>Обкладинка</span>
          <span className={styles.value}>{book.binding}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.label}>Сторінки</span>
          <span className={styles.value}>{book.pages}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.label}>Рік видання</span>
          <span className={styles.value}>{book.year}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.label}>ISBN</span>
          <span className={styles.value}>{book.isbn}</span>
        </div>
      </div>
    </div>
  );
}

export default BookDescription;
