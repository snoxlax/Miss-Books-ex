import BookList from '../cmps/BookList.jsx';
import BookFilter from '../cmps/BookFilter.jsx';
import { bookService } from '../services/bookService.js';

const { useState, useEffect } = React;
const initialFilter = {
  searchTerm: '',
  minPrice: 0,
  maxPrice: 0,
};

export default function BookIndex() {
  const [books, setBooks] = useState([]);
  const [filterBy, setFilterBy] = useState(initialFilter);
  useEffect(() => {
    bookService.getBooks(filterBy).then((books) => {
      setBooks(books);
    });
  }, [filterBy]);
  const handleRemoveBook = (bookId) => {
    setBooks((prevBooks) => [
      ...prevBooks.filter((book) => book.id !== bookId),
    ]);
  };

  return (
    <section className="book-index">
      <BookFilter
        onSetFilter={setFilterBy}
        filterBy={filterBy}
      />
      <BookList
        books={books}
        onRemoveBook={handleRemoveBook}
      />
    </section>
  );
}
