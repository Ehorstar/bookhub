import styles from "./Header.module.css";

function Links() {
  return (
    <nav className={styles.links}>
      <a className={"link"} href="#">
        Детектив
      </a>
      <a className={"link"} href="#">
        Горор
      </a>
      <a className={"link"} href="#">
        Містика
      </a>
      <a className={"link"} href="#">
        Фантастика
      </a>
      <a className={"link"} href="#">
        Пригоди
      </a>
      <a className={"link"} href="#">
        Фентезі
      </a>
    </nav>
  );
}

export default Links;
