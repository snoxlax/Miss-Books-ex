const { useState, useEffect, useRef } = React;
const { useParams, Link } = ReactRouterDOM;
import { bookService } from '../services/bookService.js';
import LongText from '../cmps/LongText.jsx';
import AddReview from '../cmps/AddReview.jsx';

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

  const handleReviewAdded = (updatedBook) => {
    setBook(updatedBook);
  };

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
            <span className="author-catagories">
              by {book.authors.join(', ')} ({book.publishedDate}) |{' '}
              {book.categories.join(', ')}
            </span>
          </div>
          <div className="book-details-description">
            <LongText>{book.description}</LongText>
          </div>
          <div className="book-details-info">
            <span className="grey-box">{book.pageCount} pages</span>
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
        </div>
      </section>
      <section className="prev-next-book mt-4">
        <Link
          className="blue-text btn"
          to={`/book/${book.prevBookId}`}
        >
          Prev
        </Link>
        <Link
          className="blue-text btn"
          to={`/book/${book.nextBookId}`}
        >
          Next
        </Link>
      </section>
      <hr style={{ width: '50%' }} />
      <section className="reviews mt-4">
        <h2>Reviews</h2>

        <AddReview
          book={book}
          onReviewAdded={handleReviewAdded}
        />

        <div className="reviews-header">
          <h2>Others gave it...</h2>
          {book.score ? (
            <div className="score">
              {`${book.score.toFixed(1)} out of 5`}
              <Star filled={true} />
            </div>
          ) : (
            <span></span>
          )}
        </div>
        <div className="reviews-container">
          {!!book.reviews ? (
            book.reviews.map((review, index) => (
              <Review
                key={`${review.name}-${index}`}
                review={review}
              />
            ))
          ) : (
            <div className="no-reviews">
              <p>No reviews yet. </p>
              <p>Be the first to review this book!</p>
            </div>
          )}
        </div>
      </section>
    </section>
  ) : (
    <div className="book-details">
      <h1>Loading...</h1>
    </div>
  );
}

function Review({ review }) {
  const renderStars = (rating) => {
    return Array(5)
      .fill()
      .map((_, i) => (
        <Star
          key={i}
          filled={i < rating}
        />
      ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="review-item">
      <div className="review-header">
        <div className="reviewer-name">{review.name}</div>
        <div className="review-date">{formatDate(review.readAt)}</div>
      </div>
      <div className="review-rating">
        <div className="stars">{renderStars(review.rating)}</div>
        <span>{review.rating}/5</span>
      </div>
    </div>
  );
}

function Star({ filled }) {
  return (
    <div className={`star ${filled ? 'filled' : ''}`}>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
      </svg>
    </div>
  );
}
