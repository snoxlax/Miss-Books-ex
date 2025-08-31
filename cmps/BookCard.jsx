const { Link } = ReactRouterDOM;

export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <img
        src={book.thumbnail}
        alt={book.title}
        style={{
          width: '100px',
          height: '100px',
          margin: 'auto',
          padding: '1em',
          borderRadius: '4px',
        }}
      />
      <p>
        {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
      <p>{book.listPrice.isOnSale}</p>
      <p>
        <Link to={`/book/${book.id}`}>
          <button>Details</button>
        </Link>
      </p>
    </div>
  );
}
