require('dotenv').config();
const mongoose = require('mongoose');
const { connectToDatabase } = require('../db');
const { authors, books } = require('./data');

const Author = require('../models/Author');
const Book = require('../models/Book');

const main = async () => {
  await connectToDatabase(process.env.MONGODB_URI);

  // tyhjennä tietokanta
  await Author.deleteMany();
  await Book.deleteMany();

  // lisää kirjailijat, mutta poista ensin uuid:t
  await Author.insertMany(
    authors.map((a) => {
      delete a.id;
      return a;
    }),
  );

  const newBooks = [];
  for (let book of books) {
    // poista kirjan uuid
    delete book.id;

    // etsi kirjailijan oikea id tietokannassa viitettä varten
    const authorId = await Author.findOne({ name: book.author }).select('_id');

    if (!authorId) {
      console.log(
        `Unexpected error: Author ${book.author} was not found in the database`,
      );
    }
    newBooks.push({ ...book, author: authorId ? authorId : null });
  }

  // lisää kirjailijat
  await Book.insertMany(newBooks);

  // sulje tietokantayhteys
  mongoose.connection.close();
};

main();
