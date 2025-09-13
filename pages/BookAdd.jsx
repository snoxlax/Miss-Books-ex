import { bookService } from '../services/bookService.js';
const { useState, useEffect } = React;
const { useNavigate } = ReactRouterDOM;

export default function BookAdd() {
  const [searchTerm, setSearchTerm] = useState('');
  const [googleBooks, setGoogleBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      bookService
        .searchGoogleBooks(searchTerm)
        .then(setGoogleBooks)
        .catch((error) => {
          console.error('Error fetching books:', error);
        });
      console.log('Books fetched');
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  function handleAddBook(bookId) {
    bookService
      .addGoogleBook(bookId)
      .then((book) => {
        navigate(`/book/${book.id}`);
      })
      //   .then(() => showSuccessMsg('Book added successfully'))
      .catch((error) => {
        console.error('Error adding book:', error);
        showErrorMsg('somthing went wrong');
      });
  }

  return (
    <section className="book-add-container">
      <div className="book-search">
        <h1>Add a Book</h1>
        <input
          type="text"
          id="searchTerm"
          placeholder="Search for a book"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="book-add-list">
        {googleBooks ? (
          googleBooks.map((book) => (
            <div
              key={book.id}
              className="book-add-card"
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                className="book-add-img"
              />
              <div className="book-add-info">
                <h2>{book.title || 'No title'}</h2>
                <p>
                  {(book.authors && `by ${book.authors.join(', ')}`) ||
                    'Unknown Author'}
                </p>
                <p>{book.publishedDate || 'No published date'}</p>
              </div>
              <button onClick={() => handleAddBook(book.id)}>+ Add Book</button>
            </div>
          ))
        ) : (
          <div className="no-books">
            <p>No books found</p>
          </div>
        )}
      </div>
    </section>
  );
}
