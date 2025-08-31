import BookList from '../cmps/BookList.jsx';
import BookFilter from '../cmps/BookFilter.jsx';

const { useState, useEffect } = React;

export default function BookIndex() {
  return (
    <section className="book-index">
      <BookFilter />
      <BookList />
    </section>
  );
}
