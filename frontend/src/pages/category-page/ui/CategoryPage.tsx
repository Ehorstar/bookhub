import { useParams } from "react-router-dom";
import styles from "./CategoryPage.module.css";
import { useGetAllBooksQuery } from "../../../entities/Book/api/api";
import BookCard from "../../../entities/Book";
import Breadcrumbs from "../../../shared/ui/Breadcrumbs/Breadcrumbs";

function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { data } = useGetAllBooksQuery();

  if (!category) return null;

  const books = data?.filter((book) => book.categories.includes(category));

  return (
    <div className="container">
      <div className={styles.header}>
        <Breadcrumbs
          items={[{ label: "Головна", to: "/" }, { label: `${category}` }]}
        />

        <h1 className={styles.title}>{category}</h1>
      </div>
      <div className={styles.category}>
        {books?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
