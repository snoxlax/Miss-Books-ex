const { useState, useEffect, useRef } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;
import { bookService } from '../services/bookService.js';
import LongText from '../cmps/LongText.jsx';

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const params = useParams();
  const readTime = useRef('');
  const bookAge = useRef('');
  useEffect(() => {
    bookService.getBook(params.id).then((book) => {
      setBook(book);
    });
  }, [params.id]);

  readTime.current = () => {
    if (book.pageCount > 500) {
      return 'Serious Reading';
    }
    if (book.pageCount > 200) {
      return 'Decent Reading';
    }

    if (book.pageCount < 100) {
      return 'Light Reading';
    }
    return '';
  };

  bookAge.current = () => {
    if (book.publishedDate > new Date().getFullYear() - 10) {
      return 'New';
    } else {
      return 'Vintage';
    }
  };

  return book ? (
    <section>
      <section className="book-details">
        <div
          className="book-details-img"
          style={{ position: 'relative' }}
        >
          {book.listPrice.isOnSale && <p className="on-sale-text">On Sale</p>}
          <img
            src={book.thumbnail}
            alt={book.title}
          />
        </div>
        <div className="book-details-info">
          <h1>{book.title}</h1>
          <h2 className="fade-text">{book.subtitle}</h2>
          <div className="tags-container">
            <span className="tag">{bookAge.current()}</span>{' '}
            {readTime.current() && (
              <span className="tag">{readTime.current()}</span>
            )}
          </div>
          <div>
            <span>
              by {book.authors.join(', ')} ({book.publishedDate}) |{' '}
              {book.categories.join(', ')}
            </span>
          </div>
          <div className="book-details-description">
            <LongText>{book.description}</LongText>
          </div>
          <p className="">
            {' '}
            <span className="grey-box">{book.pageCount} pages</span>
          </p>
          <p className="grey-box">Language: {book.language}</p>
          <p
            className={`grey-box ${
              book.listPrice.amount > 150
                ? 'red-text'
                : book.listPrice.amount < 20
                ? 'green-text'
                : 'black-text'
            }`}
          >
            Price: {book.listPrice.amount} {book.listPrice.currencyCode}
          </p>
        </div>
      </section>
      <section className="prev-next-book mt-4">
        <Link
          className="blue-text"
          to={`/book/${book.prevBookId}`}
        >
          Prev
        </Link>
        <Link
          className="blue-text"
          to={`/book/${book.nextBookId}`}
        >
          Next
        </Link>
      </section>
    </section>
  ) : (
    <div className="book-details">
      <h1>Loading...</h1>
    </div>
  );
}
