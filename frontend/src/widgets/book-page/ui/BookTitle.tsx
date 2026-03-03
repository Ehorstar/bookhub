import styles from "./BookTitle.module.css";
import {
  BookOutlined,
  FileTextOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import Pluralize from "../../../shared/ui/Pluralize/Pluralize";
import type { Book } from "../../../entities/Book/model/types";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";

type BookTitleProps = {
  book: Book;
};

export default function BookTitle({ book }: BookTitleProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.rating}>
        <div className={styles.rate}>
          <Rate
            allowHalf
            disabled
            defaultValue={book.rating}
            style={{ fontSize: 25 }}
          />
          <p className={styles.text}>{book.rating}</p>
        </div>
        <div className={`${styles.reviews} ${styles.link}`}>
          <Pluralize
            count={book.reviewsCount}
            one="оцінка"
            few="оцінки"
            many="оцінок"
          />
        </div>
      </div>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{book.title}</h1>
        <p className={styles.text}>{book.author}</p>
      </div>

      <div className={`${styles.typeCard} ${styles.paper}`}>
        <p className={styles.typeTitle}>Паперова книга</p>
        <p className="price">{book.price} ETH</p>
      </div>

      <div className={styles.description}>
        <p className={styles.text}>
          <BookOutlined /> палітурка
        </p>
        <div className="deviderVertical" />
        <p className={styles.text}>
          <FileTextOutlined /> {book.pages} стор.
        </p>
        <div className="deviderVertical" />
        <p className={styles.text}>
          <GlobalOutlined /> {book.language}
        </p>
      </div>

      <div className={styles.genre}>
        <div className="devider" />
        <p
          className={styles.link}
          onClick={() => navigate(`/books/${book.categories[0]}`)}
        >
          {book.categories[0]}
        </p>
        <div className="devider" />
      </div>
    </div>
  );
}
