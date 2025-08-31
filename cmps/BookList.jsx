const { Link } = ReactRouterDOM;
import BookCard from './BookCard.jsx';

const books = [
  {
    id: 'OXeJK8wNskL',
    title: 'The Great Gatsby',
    description: 'placerat nisi sodales suscipit tellus',
    thumbnail: 'http://ca.org/books-photos/20.jpg',
    listPrice: {
      amount: 109,
      currencyCode: 'ILS',
      isOnSale: false,
    },
  },
  {
    id: 'OREMG7oSskc',
    title: 'To Kill a Mockingbird',
    description: 'placerat nisi sodales suscipit tellus',
    thumbnail: 'http://ca.org/books-photos/20.jpg',
    listPrice: {
      amount: 102,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: '0zeMG8wNskc',
    title: '1984',
    description: 'placerat nisi sodales suscipit tellus',
    thumbnail: 'http://ca.org/books-photos/20.jpg',
    listPrice: {
      amount: 80,
      currencyCode: 'USD',
      isOnSale: true,
    },
  },
];

export default function BookList({ onRemoveBook }) {
  return (
    <section className="book-list">
      <Link
        style={{
          margin: 'auto',
          border: '1px solid var(--clr1)',
          padding: '0.5em',
          borderRadius: '4px',
        }}
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
