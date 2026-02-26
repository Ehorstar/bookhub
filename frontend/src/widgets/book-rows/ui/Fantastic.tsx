import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Row.module.css";
import "swiper/css";
import { useGetAllBooksQuery } from "../../../entities/Book/api/api";
import Arrow from "../../../shared/ui/Arrow/Arrow";
import BookCard from "../../../entities/Book";

function Artistic() {
  const { data = [], isLoading, error } = useGetAllBooksQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading books</p>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Фантастика</h1>
        <Arrow text="Побачити більше" className={styles.Arrow} />
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
        {data
          .filter((book) => book.categories.includes("Фантастика"))
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

export default Artistic;
