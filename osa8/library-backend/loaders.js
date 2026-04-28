const DataLoader = require('dataloader');
const Book = require('./models/Book');

const createBookCountLoader = () => {
  // dataloader käsittelee kaikki bookCount kyselyt kerralla
  return new DataLoader(async (_authorIds) => {
    const authors = await Book.aggregate([
      // aggregaatiovaihe 1 hakee kaikki soveltuvat kirjat
      { $match: { author: { $in: _authorIds } } },
      // aggregaatiovaihe 2 ryhmittelee ne kirjailijan mukaan laskien määrät
      { $group: { _id: '$author', bookCount: { $sum: 1 } } },
    ]);

    // mapataan vielä id:t indekseihin, jotta niiden haku on nopeampaa
    const bookCountMap = authors.reduce((map, author) => {
      map[author._id.toString()] = author.bookCount;
      return map;
    }, {});

    // vastauksena kappalemäärät samassa järjestyksessä kuin alkuperäiset id:t
    return _authorIds.map((_id) => bookCountMap[_id.toString()]);
  });
};

module.exports = { createBookCountLoader };
