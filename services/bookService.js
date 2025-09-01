import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const BOOK_KEY = 'miss-booksDB';

_createBooks();

export const bookService = {
  getBooks,
  getBook,
  addBook,
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
  console.log(title);
  console.log(price);
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
