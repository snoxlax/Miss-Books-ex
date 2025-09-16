const { useState } = React;
import { bookService } from '../services/bookService.js';

export default function AddReview({ book, onReviewAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    readAt: new Date().toISOString().slice(0, 10),
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    let convertedValue = value;

    switch (e.target.type) {
      case 'range':
      case 'number':
        convertedValue = +e.target.value;
        break;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: convertedValue,
    }));
  }

  async function onAddReview(e) {
    e.preventDefault();
    const updatedBook = await bookService.addReview(book.id, formData);
    if (updatedBook && onReviewAdded) {
      onReviewAdded(updatedBook);
    }
    setFormData({ name: '', rating: 0, readAt: '' });
  }

  const onRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  return (
    <div className="add-review">
      <h2>Leave a Review</h2>
      <form
        className="review-form"
        onSubmit={onAddReview}
      >
        <div className="input-container">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <span>Rating</span>
        <StarRating onRatingChange={onRatingChange} />

        <div className="input-container">
          <label htmlFor="readAt">Date Read</label>
          <input
            type="date"
            id="readAt"
            name="readAt"
            value={formData.readAt}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="submit"
          className="submit-btn ml-auto"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

function StarRating({ totalStars = 5, onRatingChange }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div
      className="stars"
      onMouseLeave={() => setHover(rating)}
    >
      {[...Array(totalStars)].map((_, i) => (
        <div
          key={i + 1}
          className={`star-icon ${
            i + 1 <= (hover || rating) ? 'selected' : ''
          }`}
          onClick={() => handleRating(i + 1)}
          onMouseEnter={() => setHover(i + 1)}
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
