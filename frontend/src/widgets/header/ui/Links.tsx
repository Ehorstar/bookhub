import styles from "./Header.module.css";

function Links() {
  return (
    <nav className={styles.links}>
      <a className={"link"} href="/books/Детектив">
        Детектив
      </a>
      <a className={"link"} href="/books/Горор">
        Горор
      </a>
      <a className={"link"} href="/books/Містика">
        Містика
      </a>
      <a className={"link"} href="/books/Фантастика">
        Фантастика
      </a>
      <a className={"link"} href="/books/Фентезі">
        Фентезі
      </a>
    </nav>
  );
}

export default Links;
