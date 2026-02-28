import { useParams } from "react-router-dom";
import { useGetBookBySlugQuery } from "../../../entities/Book/api/api";
import Breadcrumbs from "../../../shared/ui/Breadcrumbs/Breadcrumbs";
import styles from "./BookPage.module.css";
import {
  BookBlock,
  BookDescription,
  BookGallery,
  BookTitle,
} from "../../../widgets/book-page";

function BookPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: book, isLoading, error } = useGetBookBySlugQuery(slug!);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error not found</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[{ label: "Головна", to: "/" }, { label: `${book.title}` }]}
      />
      <div className={styles.content}>
        <BookGallery images={book.images} />
        <BookTitle book={book} />
        <BookBlock book={book} />
      </div>
      <BookDescription book={book} />
    </div>
  );
}

export default BookPage;
