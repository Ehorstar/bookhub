import styles from "./AboutBookHub.module.css";
import logo from "../../../assets/ImagesServing/about-bookhub.png";
import Breadcrumbs from "../../../shared/ui/Breadcrumbs/Breadcrumbs";

export default function AboutBookHub() {
  return (
    <section className={styles.section}>
      <Breadcrumbs
        items={[{ label: "Головна", to: "/" }, { label: `${"Про BookHub"}` }]}
      />
      <div className="container">
        <div className={styles.card}>
          <div className={styles.left}>
            <img className={styles.image} src={logo} alt="" />
          </div>

          <div className={styles.right}>
            <h2 className={styles.title}>Про BookHub</h2>

            <p className={styles.text}>
              BookHub — онлайн-книгарня, де зручно знаходити улюблені книги за
              жанрами та авторами, зберігати бажане у wishlist і швидко
              повертатися до переглянутого.
            </p>

            <p className={styles.text}>
              Ми зібрали добірки художньої літератури, фантастики, містики та
              фентезі, щоб ти знаходив “свою” книгу за кілька кліків. Доступні
              сторінки книг з описом, рейтингом та відгуками.
            </p>

            <p className={styles.text}>
              Наша мета — зробити вибір книги простим і приємним: розумний
              пошук, чистий інтерфейс, швидка навігація і персональні списки.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
