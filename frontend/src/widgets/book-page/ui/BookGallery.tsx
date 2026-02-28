import { useState } from "react";
import styles from "./BookGallery.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

type BookGalleryProps = {
  images: string[];
};

export default function BookGallery({ images }: BookGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div className={styles.container}>
      <Swiper
        direction="vertical"
        slidesPerView={4}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
        }}
        modules={[Mousewheel]}
        className={styles.list}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className={`${styles.spacer} ${activeImage === index ? styles.active : ""}`}
              onClick={() => setActiveImage(index)}
            >
              <img src={image} alt="book" className={styles.image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <img
        src={images[activeImage]}
        alt={"book"}
        className={styles.mainCover}
      />
    </div>
  );
}
