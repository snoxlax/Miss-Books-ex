const { Link } = ReactRouterDOM;
import { bookService } from '../services/bookService.js';

export default function BookCard({ book, onRemoveBook }) {
  const handleRemoveBook = (e) => {
    e.preventDefault();
    e.stopPropagation();

    bookService
      .removeBook(book.id)
      .then(() => {
        if (onRemoveBook) {
          onRemoveBook(book.id);
        }
      })
      .then(() => showSuccessMsg('Book removed successfully'))
      .catch((error) => {
        console.error('Failed to remove book:', error);
      });
  };

  return (
    <div className="book-card">
      <div className="book-card-img">
        <img
          src={book.thumbnail}
          alt={book.title}
        />
        {book.listPrice.isOnSale && <p className="on-sale-text">On Sale</p>}
        <button
          className="remove-btn"
          onClick={handleRemoveBook}
          title="Remove book"
        >
          ×
        </button>
      </div>
      <h1>{book.title}</h1>
      <p>by {book.authors.join(', ')}</p>
      <p className="mt-4 mx-auto">
        {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
      <Link
        className="btn mx-auto"
        to={`/book/${book.id}`}
      >
        Details
      </Link>
    </div>
  );
}
