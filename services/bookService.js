import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';
import { showSuccessMsg } from './event-bus.service.js';

const BOOK_KEY = 'miss-booksDB';

_createBooks();

export const bookService = {
  getBooks,
  getBook,
  addBook,
  addGoogleBook,
  searchGoogleBooks,
  addReview,
  removeBook,
};

function getBooks(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.searchTerm) {
      books = books.filter((book) =>
        book.title.toLowerCase().includes(filterBy.searchTerm.toLowerCase())
      );
    }
    if (filterBy.minPrice > 0 || filterBy.maxPrice > 0) {
      books = books.filter(
        (book) =>
          book.listPrice.amount >= filterBy.minPrice &&
          book.listPrice.amount <= filterBy.maxPrice
      );
    }
    return books;
  });
}

function getBook(id) {
  return storageService
    .get(BOOK_KEY, id)
    .then((book) => _setNextPrevBookId(book));
}

function addBook(title, price) {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'];
  const book = {
    id: utilService.makeId(),
    title: title,
    subtitle: utilService.makeLorem(4),
    authors: [utilService.makeLorem(1)],
    publishedDate: utilService.getRandomIntInclusive(1950, 2024),
    description: utilService.makeLorem(20),
    pageCount: utilService.getRandomIntInclusive(20, 600),
    categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
    thumbnail: `http://www.coding-academy.org/books-photos/${
      Math.floor(Math.random() * 20) + 1
    }.jpg`,
    language: 'en',
    listPrice: {
      amount: price,
      currencyCode: 'EUR',
      isOnSale: Math.random() > 0.7,
    },
  };
  return storageService.post(BOOK_KEY, book);
}

async function searchGoogleBooks(searchTerm) {
  if (!searchTerm) {
    return;
  }
  searchTerm = encodeURIComponent(searchTerm);

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`
  );
  const data = await response.json();
  const googleData = data.items;
  const books = [];
  googleData.forEach((book) => {
    books.push({
      id: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      authors: book.volumeInfo.authors,
      publishedDate: book.volumeInfo.publishedDate,
      description: book.volumeInfo.description,
      pageCount: book.volumeInfo.pageCount,
      categories: book.volumeInfo.categories,
      thumbnail: book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : undefined,
      language: book.volumeInfo.language,
    });
  });
  return books;
}

async function addGoogleBook(bookId) {
  if (!bookId) {
    return;
  }

  try {
    const checkBook = await getBook(bookId);
    if (checkBook) {
      showErrorMsg('Book already exists');
      return checkBook;
    }
  } catch (error) {
    console.error('Error fetching book:', error);
  }

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`
  );
  const data = await response.json();
  const googleBook = data;

  const book = {
    id: googleBook.id,
    title: googleBook.volumeInfo.title,
    subtitle: googleBook.volumeInfo.subtitle,
    authors: googleBook.volumeInfo.authors,
    publishedDate: googleBook.volumeInfo.publishedDate,
    description: googleBook.volumeInfo.description,
    pageCount: googleBook.volumeInfo.pageCount,
    categories: googleBook.volumeInfo.categories,
    thumbnail: googleBook.volumeInfo.imageLinks
      ? googleBook.volumeInfo.imageLinks.thumbnail
      : undefined,
    language: googleBook.volumeInfo.language,
    listPrice: {
      amount: Math.floor(Math.random() * 600) + 1,
      currencyCode: 'EUR',
      isOnSale: Math.random() > 0.7,
    },
  };

  if (book.id) {
    showSuccessMsg('Book added successfully');
  }

  return storageService.post(BOOK_KEY, book);
}

async function addReview(bookId, review) {
  const book = await getBook(bookId);
  const bookWithReview = {
    ...book,
    reviews: book.reviews ? [...book.reviews, review] : [review],
    score: book.score
      ? (book.score * book.reviews.length + review.rating) /
        (book.reviews.length + 1)
      : review.rating,
  };
  return storageService.put(BOOK_KEY, bookWithReview);
}

function removeBook(bookId) {
  return storageService.remove(BOOK_KEY, bookId);
}

function _setNextPrevBookId(book) {
  return getBooks().then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id);
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0];
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1];
    book.nextBookId = nextBook.id;
    book.prevBookId = prevBook.id;
    return book;
  });
}

function _createBooks() {
  const books = utilService.loadFromStorage(BOOK_KEY);
  if (!books || !books.length) {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'];
    const books = [];
    for (let i = 0; i < 20; i++) {
      const book = {
        id: utilService.makeId(),
        title: utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors: [utilService.makeLorem(1)],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [
          ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)],
        ],
        thumbnail: `http://www.coding-academy.org/books-photos/${i + 1}.jpg`,
        language: 'en',
        listPrice: {
          amount: utilService.getRandomIntInclusive(80, 500),
          currencyCode: 'EUR',
          isOnSale: Math.random() > 0.7,
        },
      };
      books.push(book);
    }
    utilService.saveToStorage(BOOK_KEY, books);
  }
}
