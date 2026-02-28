import { useState } from "react";
import styles from "./Search.module.css";
import { useSearchBooksQuery } from "../../../entities/Book/api/api";
import { useNavigate } from "react-router-dom";
import { useUiState } from "../../../widgets/header/model/modal-state.store";
import SearchInput from "./SearchInput";
import SearchDropdown from "./SearchDropdown";

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

      <SearchInput
        query={query}
        setQuery={setQuery}
        show={show}
        onOpen={() => open("search")}
      />

      <SearchDropdown
        books={books}
        isFetching={isFetching}
        query={query}
        show={show}
        handleNavigate={handleNavigate}
      />
    </div>
  );
};

export default Search;
