import { SearchOutlined } from "@ant-design/icons";
import styles from "./Search.module.css";

const Search = () => {
  return (
    <div className={styles.search}>
      <SearchOutlined className={styles.icon} />
      <input type="text" placeholder={"Пошук у BookHub"} />
    </div>
  );
};

export default Search;
