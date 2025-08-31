import { utilService } from './util.service.js';

const BOOK_KEY = 'book';

export const bookService = {
  _createBooks,
  getBooks,
};

const books = [
  {
    id: '6JQz8H',
    title: 'above above',
    subtitle: 'in such cases burn the story as generally',
    authors: ['each time'],
    publishedDate: 1982,
    description:
      'I the story was the color the color the port this happened to a different story was in such cases bit by bit of nature above happens of nature bit by bit from various people burn from various people',
    pageCount: 218,
    categories: ['Religion'],
    thumbnail: 'http://coding-academy.org/books-photos/1.jpg',
    language: 'en',
    listPrice: {
      amount: 261,
      currencyCode: 'EUR',
      isOnSale: true,
    },
  },
  {
    id: 'QqAxDQ',
    title: 'more or less I',
    subtitle: 'above and the port All',
    authors: ['the color'],
    publishedDate: 1964,
    description:
      'to each time a live channel from various people burn more or less was each time the port I more or less burn and to was to a different story was and of nature',
    pageCount: 228,
    categories: ['Poetry'],
    thumbnail: 'http://coding-academy.org/books-photos/2.jpg',
    language: 'en',
    listPrice: {
      amount: 169,
      currencyCode: 'EUR',
      isOnSale: true,
    },
  },
  {
    id: 'Wp1vNi',
    title: 'bit by bit I',
    subtitle: 'above the story of nature the story',
    authors: ['in such cases'],
    publishedDate: 1984,
    description:
      'the story happens a different story had to was a different story happens the color in such cases in such cases I a live channel burn the color and had The sky happens I',
    pageCount: 32,
    categories: ['Poetry'],
    thumbnail: 'http://coding-academy.org/books-photos/3.jpg',
    language: 'en',
    listPrice: {
      amount: 258,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'U1pqj1',
    title: 'more or less a different story',
    subtitle: 'had to this happened it',
    authors: ['more or less'],
    publishedDate: 1966,
    description:
      'to was a live channel All from various people as generally was above and each time each time more or less All a pleasure more or less each time had as generally more or less The sky',
    pageCount: 203,
    categories: ['Poetry'],
    thumbnail: 'http://coding-academy.org/books-photos/4.jpg',
    language: 'en',
    listPrice: {
      amount: 190,
      currencyCode: 'EUR',
      isOnSale: true,
    },
  },
  {
    id: 'w8qAm9',
    title: 'a live channel from various people',
    subtitle: 'a different story happens I and',
    authors: ['each time'],
    publishedDate: 1950,
    description:
      'as generally to to the color the color in such cases I from various people was The sky had I in such cases from various people it as generally the color to from various people a pleasure',
    pageCount: 21,
    categories: ['Fiction'],
    thumbnail: 'http://coding-academy.org/books-photos/5.jpg',
    language: 'en',
    listPrice: {
      amount: 450,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'm8gz0f',
    title: 'more or less the port',
    subtitle: 'The sky of nature the color above',
    authors: ['to'],
    publishedDate: 1993,
    description:
      'bit by bit the story from various people happens a pleasure was a different story more or less a live channel happens more or less and had I the port the story from various people was more or less was',
    pageCount: 133,
    categories: ['Computers'],
    thumbnail: 'http://coding-academy.org/books-photos/6.jpg',
    language: 'en',
    listPrice: {
      amount: 204,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'EV4dvv',
    title: 'from various people The sky',
    subtitle: 'bit by bit of nature was the color',
    authors: ['burn'],
    publishedDate: 1976,
    description:
      'I as generally tuned All The sky and the story a live channel each time burn the color of nature from various people it a different story from various people a different story more or less to The sky',
    pageCount: 322,
    categories: ['Religion'],
    thumbnail: 'http://coding-academy.org/books-photos/7.jpg',
    language: 'en',
    listPrice: {
      amount: 172,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'osEDsK',
    title: 'more or less of nature',
    subtitle: 'a pleasure had was above',
    authors: ['All'],
    publishedDate: 2011,
    description:
      'as generally was a live channel of nature burn and above it to a live channel The sky and happens bit by bit of nature bit by bit I a different story The sky bit by bit',
    pageCount: 329,
    categories: ['Poetry'],
    thumbnail: 'http://coding-academy.org/books-photos/8.jpg',
    language: 'en',
    listPrice: {
      amount: 327,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'PmTDTG',
    title: 'bit by bit from various people',
    subtitle: 'I from various people the port and',
    authors: ['was'],
    publishedDate: 1997,
    description:
      'to the color to had had it burn and this happened from various people I this happened from various people the story a different story had and it this happened more or less',
    pageCount: 457,
    categories: ['Fiction'],
    thumbnail: 'http://coding-academy.org/books-photos/9.jpg',
    language: 'en',
    listPrice: {
      amount: 301,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'CmTDve',
    title: 'to a live channel',
    subtitle: 'to in such cases in such cases a live channel',
    authors: ['I'],
    publishedDate: 1965,
    description:
      'this happened a pleasure bit by bit this happened above was a live channel of nature each time each time the story a pleasure to was burn was I the color burn to',
    pageCount: 395,
    categories: ['Fiction'],
    thumbnail: 'http://coding-academy.org/books-photos/10.jpg',
    language: 'en',
    listPrice: {
      amount: 442,
      currencyCode: 'EUR',
      isOnSale: true,
    },
  },
  {
    id: '7gjOxT',
    title: 'a pleasure more or less',
    subtitle: 'a live channel was I and',
    authors: ['burn'],
    publishedDate: 1966,
    description:
      'the port The sky it The sky more or less All of nature a different story the color the color of nature happens to the story in such cases happens I above I was',
    pageCount: 204,
    categories: ['Computers'],
    thumbnail: 'http://coding-academy.org/books-photos/11.jpg',
    language: 'en',
    listPrice: {
      amount: 428,
      currencyCode: 'EUR',
      isOnSale: true,
    },
  },
  {
    id: 'HJdDqA',
    title: 'happens to',
    subtitle: 'in such cases from various people to the story',
    authors: ['from various people'],
    publishedDate: 2001,
    description:
      'The sky in such cases from various people in such cases it of nature happens All this happened as generally and the story was of nature bit by bit happens All burn from various people a pleasure',
    pageCount: 532,
    categories: ['Computers'],
    thumbnail: 'http://coding-academy.org/books-photos/12.jpg',
    language: 'en',
    listPrice: {
      amount: 92,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'hI94gu',
    title: 'All bit by bit',
    subtitle: 'each time a different story the story bit by bit',
    authors: ['a pleasure'],
    publishedDate: 1997,
    description:
      'more or less burn to above and was more or less to was to the story it was to to in such cases burn each time the port to',
    pageCount: 427,
    categories: ['Love'],
    thumbnail: 'http://coding-academy.org/books-photos/13.jpg',
    language: 'en',
    listPrice: {
      amount: 438,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'K1CBXt',
    title: 'above was',
    subtitle: 'in such cases more or less the port the port',
    authors: ['had'],
    publishedDate: 2004,
    description:
      'to a live channel The sky more or less was in such cases and tuned tuned a live channel this happened this happened happens the color happens was it The sky happens tuned',
    pageCount: 512,
    categories: ['Poetry'],
    thumbnail: 'http://coding-academy.org/books-photos/14.jpg',
    language: 'en',
    listPrice: {
      amount: 182,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'WsbipE',
    title: 'the color to',
    subtitle: 'the port a different story the port happens',
    authors: ['the color'],
    publishedDate: 1958,
    description:
      'a live channel above each time had had happens a different story a pleasure as generally each time bit by bit a pleasure it of nature and a pleasure and to the color of nature',
    pageCount: 467,
    categories: ['Love'],
    thumbnail: 'http://coding-academy.org/books-photos/15.jpg',
    language: 'en',
    listPrice: {
      amount: 256,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'AyUjAk',
    title: 'above from various people',
    subtitle: 'in such cases as generally from various people this happened',
    authors: ['to'],
    publishedDate: 1976,
    description:
      'the story above more or less more or less as generally tuned was to tuned had from various people each time and above the port the story to of nature had bit by bit',
    pageCount: 161,
    categories: ['Computers'],
    thumbnail: 'http://coding-academy.org/books-photos/16.jpg',
    language: 'en',
    listPrice: {
      amount: 408,
      currencyCode: 'EUR',
      isOnSale: true,
    },
  },
  {
    id: 'hdWtXu',
    title: 'All was',
    subtitle: 'I I the port above',
    authors: ['bit by bit'],
    publishedDate: 2014,
    description:
      'each time tuned had above as generally The sky it bit by bit of nature the story a different story was more or less above each time the story a pleasure happens bit by bit the color',
    pageCount: 264,
    categories: ['Religion'],
    thumbnail: 'http://coding-academy.org/books-photos/17.jpg',
    language: 'en',
    listPrice: {
      amount: 408,
      currencyCode: 'EUR',
      isOnSale: true,
    },
  },
  {
    id: 'lPLWtS',
    title: 'to and',
    subtitle: 'All the color The sky and',
    authors: ['a pleasure'],
    publishedDate: 1993,
    description:
      'this happened a pleasure the story to to had from various people a live channel from various people All from various people burn was bit by bit was I as generally a different story tuned from various people',
    pageCount: 137,
    categories: ['Fiction'],
    thumbnail: 'http://coding-academy.org/books-photos/18.jpg',
    language: 'en',
    listPrice: {
      amount: 348,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'h5hiSt',
    title: 'and was',
    subtitle: 'as generally I was the color',
    authors: ['All'],
    publishedDate: 1983,
    description:
      'and I a live channel was in such cases bit by bit was I I bit by bit and this happened All I the color was was more or less as generally this happened',
    pageCount: 78,
    categories: ['Fiction'],
    thumbnail: 'http://coding-academy.org/books-photos/19.jpg',
    language: 'en',
    listPrice: {
      amount: 195,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'Zg7jGi',
    title: 'The sky had',
    subtitle: 'and above more or less of nature',
    authors: ['a live channel'],
    publishedDate: 1986,
    description:
      'each time bit by bit this happened was bit by bit the story a live channel All tuned a pleasure was was each time the story tuned The sky the story The sky to to',
    pageCount: 90,
    categories: ['Fiction'],
    thumbnail: 'http://coding-academy.org/books-photos/20.jpg',
    language: 'en',
    listPrice: {
      amount: 190,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
];

const book = {
  id: 'OXeMG8wNskc',
  title: 'metus hendrerit',
  subtitle: 'mi est eros dapibus himenaeos',
  authors: ['Barbara Cartland'],
  publishedDate: 1999,
  description: 'placerat nisi sodales suscipit tellus',
  pageCount: 713,
  categories: ['Computers', 'Hack'],
  thumbnail: 'http://ca.org/books-photos/20.jpg',
  language: 'en',
  listPrice: {
    amount: 109,
    currencyCode: 'EUR',
    isOnSale: false,
  },
};

function getBooks() {
  return utilService.loadFromStorage(BOOK_KEY);
}

export function _createBooks() {
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
      categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
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
