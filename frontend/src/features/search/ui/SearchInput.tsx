import { SearchOutlined } from "@ant-design/icons";
import styles from "./SearchInput.module.css";

type SearchInputProps = {
  query: string;
  setQuery: (value: string) => void;
  show: boolean;
  onOpen: () => void;
};
function SearchInput({ query, setQuery, show, onOpen }: SearchInputProps) {
  return (
    <div className={`${styles.search} ${show ? styles.searchActive : ""}`}>
      <SearchOutlined className={styles.icon} />
      <input
        onFocus={() => onOpen()}
        type="text"
        placeholder="Пошук у BookHub"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
