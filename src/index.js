import Big from 'big.js';

const PRICE_OF_BOOK = 8;
const discountRates = { 1: 1, 2: 0.95, 3: 0.9, 4: 0.8, 5: 0.75 };

const getBookAppearances = books => books.reduce((bookAppearances, book) => {
  bookAppearances[book] = ((bookAppearances[book] | 0) + 1);
  return bookAppearances;
}, {});

const getMaxAmountOfBookSets = bookAppearances => Object.keys(bookAppearances).reduce((maxAmountOfSets, book) =>
  maxAmountOfSets > bookAppearances[book] ? maxAmountOfSets : bookAppearances[book], 0);

const createBookSets = books => {
  const bookAppearancesInBasket = getBookAppearances(books);
  const maxAmountOfSets = getMaxAmountOfBookSets(bookAppearancesInBasket);

  let index = 0;
  return Object.keys(bookAppearancesInBasket).reduce((bookSets, book) => {
    for (let numOfBookAppearances = bookAppearancesInBasket[book]; numOfBookAppearances > 0; numOfBookAppearances--) {
      if (index >= maxAmountOfSets) {
        index = 0;
      }
      bookSets[index] = bookSets[index].concat([book]);
      index++;
    }
    return bookSets;
  }, Array(maxAmountOfSets).fill([]));
};

const getPriceOfSet = books =>
  Number(new Big(books.length).times(PRICE_OF_BOOK).times(discountRates[books.length]).toFixed(2));

const getPrice = books => {
  const bookSet = createBookSets(books);

  return bookSet.reduce((price, books) => Number(new Big(getPriceOfSet(books)).plus(price).toFixed(2)), 0);
};

export default {
  getPrice,
};