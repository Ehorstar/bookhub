import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./Search.module.css";
import { useSearchBooksQuery } from "../../../entities/Book/api/api";
import { useNavigate } from "react-router-dom";
import { useUiState } from "../../../widgets/header/model/modal-state.store";

const Search = () => {
  const { isOpen, open, close } = useUiState();
  const show = isOpen("search");

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleNavigate(slug: string) {
    navigate(`/book/${slug}`);
    setQuery("");
    close("search");
  }

  const { data: books = [], isFetching } = useSearchBooksQuery(query);

  return (
    <div className={styles.wrapper}>

      <div
        className={`${styles.overlay} ${show ? styles.overlayOpen : ""}`}
        onClick={() => close("search")}
      />
      
      <div className={`${styles.search} ${show ? styles.searchActive : ""}`}>
        <SearchOutlined className={styles.icon} />
        <input
          onFocus={() => open("search")}
          type="text"
          placeholder="Пошук у BookHub"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {show && query.trim().length > 0 && (
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
      )}
    </div>
  );
};

export default Search;
