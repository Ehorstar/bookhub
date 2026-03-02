import styles from "./Row.module.css";
import Arrow from "../../../shared/ui/Arrow/Arrow";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCard from "../../../entities/Book";
import type { Book } from "../../../entities/Book/model/types";

type BookRowProps = {
  genre: string;
  books: Book[];
};

function BookRow({ genre, books }: BookRowProps) {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{genre}</h1>
        <h1 className={styles.shadowTitle}>{genre}</h1>
        <Arrow
          text="Побачити більше"
          className={styles.Arrow}
          to={`/books/${genre}`}
        />
      </div>

      <Swiper
        spaceBetween={20}
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
        breakpoints={{
          0: { slidesPerView: 2.1 },
          768: { slidesPerView: 4.1 },
          1200: { slidesPerView: 5.1 },
        }}
        className={styles.list}
      >
        {books
          .filter((book) => book.categories.includes(genre))
          .slice(0, 8)
          .map((book) => (
            <SwiperSlide key={book.id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default BookRow;
