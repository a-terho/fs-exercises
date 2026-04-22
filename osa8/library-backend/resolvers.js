const { GraphQLError } = require('graphql');

const Author = require('./models/Author');
const Book = require('./models/Book');

const resolvers = {
  Author: {
    bookCount: async (author) => Book.countDocuments({ author: author.id }),
  },

  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allAuthors: async () => Author.find({}),

    allBooks: async (_, args) => {
      // filtteröi kokoelmaa tarpeen mukaan soveltuvin osin
      const filter = {};
      if (args.author) filter.author = args.author;
      if (args.genre) filter.genres = args.genre;

      // korvaa kirjailijoiden id-viitteet tiedoilla vastaukseen
      return Book.find(filter).populate('author');
    },
  },

  Mutation: {
    addBook: async (_, { title, author, published, genres }) => {
      // etsi ensin kirjailijalle oikea id-viite
      let bookAuthor = await Author.findOne({ name: author });

      // lisää tarvittaessa uusi kirjailija kokoelmaan
      // validoi kuitenkin syöte ennen kuin jatketaan
      if (!bookAuthor) {
        try {
          bookAuthor = new Author({ name: author });
          await bookAuthor.validate();
        } catch (err) {
          throw new GraphQLError(`Adding new author failed: ${err.message}`, {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }
      }

      // lisää kirja kokoelmaan
      try {
        const newBook = await Book.create({
          title,
          author: bookAuthor._id,
          published,
          genres,
        });
        // kirjan lisäämisen jälkeen tallenna myös jo validoitu kirjailija
        await bookAuthor.save();
        return newBook;
      } catch (err) {
        throw new GraphQLError(`Adding new book failed: ${err.message}`, {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
    },

    editAuthor: async (_, { name, setBornTo }) => {
      // etsi kirjailijaa nimeltä kokoelmasta
      const author = await Author.findOne({ name });
      if (!author) return null;

      try {
        // tallenna uudet tiedot ja palauta päivitetty kirjailija
        author.born = setBornTo;
        return author.save();
      } catch (err) {
        throw new GraphQLError(`Editing author failed: ${err.message}`, {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
    },
  },
};

module.exports = resolvers;
