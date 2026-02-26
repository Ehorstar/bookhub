import type { Book } from "../model/types";

type BookCardProps = {
  book: Book;
};

function BookCard({ book }: BookCardProps) {
  return (
    <div>
      <p>{book.title}</p>
    </div>
  );
}

export default BookCard;
