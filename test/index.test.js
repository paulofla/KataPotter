import assert from 'assert';
import index from '../src/index';

describe('basket containing', () => {
  const discountRates = {
    1: 1,
    2: 0.95,
    3: 0.9,
    4: 0.8,
    5: 0.75,
  };
  describe('the same book', () => {
    for(let numberOfBooks = 0; numberOfBooks < 6; numberOfBooks++){
      const price = numberOfBooks * 8;
      const basket = Array(numberOfBooks).fill(1);
      it(`${numberOfBooks} times should be ${price} Euro`, () => {
        assert.equal(index.getPrice(basket), price);
      });
      if(numberOfBooks > 0) {
        it(`which is book ${numberOfBooks} exactly 1 time it should be 8 Euro`, () => {
          assert.equal(index.getPrice(basket), price);
        });
      }
    }
  });
  describe('different books', () => {
    const books = [1];
    for(let numberOfBooks = 2; numberOfBooks < 6; numberOfBooks++){
      const price = numberOfBooks * 8 * (discountRates[numberOfBooks] || 0);
      books.push(numberOfBooks);
      const basket = books.map(book => book);
      it(`${numberOfBooks} unique book should be ${price} Euro`, () => {
        assert.equal(index.getPrice(basket), price);
      });
    }
  });
  describe('different books in the basket twice', () => {
    const books = [1];
    for(let numberOfBooks = 2; numberOfBooks < 6; numberOfBooks++){
      const price = numberOfBooks * 8 * (discountRates[numberOfBooks] || 0);
      books.push(numberOfBooks);
      const basket = books.concat(books);
      it(`${numberOfBooks} unique book should be ${price * 2} Euro`, () => {
        assert.equal(index.getPrice(basket), price * 2);
      });
    }
  });
  describe('edge cases', () => {
    it('3 unique items in twice and 2 other unique items in once should be 51.2 Euro', () => {
      const basket = [1, 1, 2, 2, 3, 3, 4, 5];
      assert.equal(index.getPrice(basket), 51.2);
    });
    it('3 unique items in five times and 2 other unique items in four times should be 141.2 Euro', () => {
      const basket = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5];
      assert.equal(index.getPrice(basket), 141.2);
    });
    it('2 unique items in five times and 3 other unique items in four times should be 136.8 Euro', () => {
      const basket = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5];
      assert.equal(index.getPrice(basket), 136.8);
    });
  });
});