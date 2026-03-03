import { useNavigate } from "react-router-dom";
import { useRecentlyViewedStore } from "../model/recently-viewed.store";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./RecentlyViewed.module.css";

function RecentlyViewed() {
  const books = useRecentlyViewedStore((s) => s.items);
  const navigate = useNavigate();

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    skipSnaps: true,
  });

  if (!books.length) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Нещодавно ви дивились</h2>

        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.containerEmbla}>
            {books.map((book) => (
              <div
                key={book.id}
                className={styles.slide}
                onClick={() => navigate(`/book/${book.slug}`)}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentlyViewed;
