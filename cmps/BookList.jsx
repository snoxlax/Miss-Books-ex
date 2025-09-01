const { Link } = ReactRouterDOM;
import BookCard from './BookCard.jsx';

export default function BookList({ books, onRemoveBook }) {
  return (
    <section className="book-list">
      <Link
        className="add-book-btn"
        to="/book/edit"
      >
        Add Book
      </Link>
      <div className="book-list-container">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onRemoveBook={onRemoveBook}
          />
        ))}
      </div>
    </section>
  );
}
