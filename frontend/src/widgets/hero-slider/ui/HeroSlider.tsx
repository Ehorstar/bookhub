import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import styles from "./HeroSlider.module.css";

import hero1 from "../../../assets/ImagesHero/hero-1.png";
import hero2 from "../../../assets/ImagesHero/hero-2.png";
import hero3 from "../../../assets/ImagesHero/hero-3.png";
import hero4 from "../../../assets/ImagesHero/hero-4.png";
import hero5 from "../../../assets/ImagesHero/hero-5.png";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    titleTop: "Крістіна",
    titleBottom: "Стівен Кінг",
    cta: "Переглянути",
    slug: "kristina-stiven-king",
    image: hero1,
  },
  {
    titleTop: "Мовчання ягнят",
    titleBottom: "Томас Гарріс",
    cta: "Переглянути",
    slug: "movchannya-yagnyat-tomas-garris",
    image: hero2,
  },
  {
    titleTop: "Обраниці",
    titleBottom: "Жан Крістоф Гранже",
    cta: "Переглянути",
    slug: "obranytsi-granzhe",
    image: hero4,
  },
  {
    titleTop: "Куджо",
    titleBottom: "Стівен Кінг",
    cta: "Переглянути",
    slug: "kudzho-stiven-king",
    image: hero3,
  },
  {
    titleTop: "Аутсайдер",
    titleBottom: "Стівен Кінг",
    cta: "Переглянути",
    slug: "autsajder-stiven-king",
    image: hero5,
  },
];

const HeroSlider = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        className={styles.swiper}
      >
        {slides.map((s, idx) => (
          <SwiperSlide
            key={idx}
            className={styles.slide}
            style={{ backgroundImage: `url(${s.image})`, borderRadius: "12px" }}
          >
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h1 className={styles.title}>
                {s.titleTop}
                <br />
                {s.titleBottom}
              </h1>

              <button
                className={styles.btn}
                onClick={() => navigate(`/book/${s.slug}`)}
              >
                {s.cta}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
