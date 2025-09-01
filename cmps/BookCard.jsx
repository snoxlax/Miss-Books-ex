const { Link } = ReactRouterDOM;
import LongText from './LongText.jsx';

export default function BookCard({ book }) {
  return (
    <div
      className="book-card"
      style={{ position: 'relative' }}
    >
      <h1>{book.title}</h1>
      <img
        className="book-card-img"
        src={book.thumbnail}
        alt={book.title}
        width={300}
        height={400}
        style={{ position: 'relative' }}
      />
      {book.listPrice.isOnSale && (
        <p
          className="on-sale-text"
          style={{ top: '0.5rem', left: '0.5rem' }}
        >
          On Sale
        </p>
      )}

      <LongText>{book.description}</LongText>

      <div className="flex-row">
        <p className="mt-4">
          {book.listPrice.amount} {book.listPrice.currencyCode}
        </p>
        <button>
          <Link to={`/book/${book.id}`}>Details</Link>
        </button>
      </div>
    </div>
  );
}
