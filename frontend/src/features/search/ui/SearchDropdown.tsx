import type { Book } from "../../../entities/Book/model/types";
import styles from "./SearchDropdown.module.css";

type SearchInputProps = {
  books: Book[];
  isFetching: boolean;
  query: string;
  show: boolean;
  handleNavigate: (slug: string) => void;
};

function SearchDropdown({
  books,
  isFetching,
  query,
  show,
  handleNavigate,
}: SearchInputProps) {
  return (
    <>
      {show && query.trim().length > 0 && (
        <div className={styles.dropdownWrapper}>
          <div className={styles.dropdown}>
            {isFetching && <div className={styles.text}>Шукаємо...</div>}

            {!isFetching && books.length === 0 && (
              <div className={styles.text}>Нічого не знайдено</div>
            )}

            {books.length > 0 && <div className={styles.text}>Книги</div>}

            {books.map((book, index) => (
              <>
                <div
                  key={book.id}
                  className={styles.item}
                  onClick={() => handleNavigate(book.slug)}
                >
                  <img src={book.coverImage} alt="" />
                  <div className={styles.info}>
                    <div>
                      <p className={styles.title}>{book.title}</p>
                      <p className={styles.author}>{book.author}</p>
                    </div>
                    <div className={styles.priceBlock}>
                      <p className="price">{book.price} ETH</p>
                      {book.oldPrice && (
                        <p className="oldPrice">{book.oldPrice} ETH</p>
                      )}
                    </div>
                  </div>
                </div>
                {books.length != index + 1 ? <div className="devider" /> : ""}
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SearchDropdown;
